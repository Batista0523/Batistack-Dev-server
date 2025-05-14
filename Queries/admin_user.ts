// Queries/admin_user.ts
import bcrypt from "bcrypt";
import db from "../DB/db.config";

// ✅ Admin User Interface
interface AdminUser {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

// ✅ Obtener todos los usuarios
const getAllAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const allUser = await db.any<AdminUser>("SELECT * FROM admin_user");
    return allUser;
  } catch (err) {
    console.error("Error retrieving all users", err);
    throw err;
  }
};

// ✅ Obtener un usuario por ID
const getOneAdminUser = async (id: number): Promise<AdminUser | null> => {
  try {
    const oneUser = await db.oneOrNone<AdminUser>(
      "SELECT * FROM admin_user WHERE id = $1",
      [id]
    );
    return oneUser;
  } catch (err) {
    console.error("Error retrieving one user", err);
    throw err;
  }
};

// ✅ Autenticar Usuario (Sin JWT)
const authenticateAdminUser = async (
  email: string,
  password: string
): Promise<AdminUser | null> => {
  const user = await db.oneOrNone<AdminUser>(
    "SELECT * FROM admin_user WHERE email = $1",
    [email]
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password!);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// ✅ Crear un usuario
const createAdminUser = async (user: AdminUser): Promise<AdminUser> => {
  const existingUser = await db.oneOrNone<AdminUser>(
    "SELECT id FROM admin_user WHERE email = $1",
    [user.email]
  );

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(user.password!, 10);

  const createdUser = await db.one<AdminUser>(
    `INSERT INTO admin_user (name, email, password, created_at, updated_at) 
     VALUES ($1, $2, $3, NOW(), NOW()) 
     RETURNING id, name, email, created_at, updated_at`,
    [user.name, user.email, hashedPassword]
  );

  return createdUser;
};

// ✅ Actualizar la contraseña del usuario
const updateAdminUserPassword = async (
  id: number,
  newPassword: string
): Promise<boolean> => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db.none(
    "UPDATE admin_user SET password = $1, updated_at = NOW() WHERE id = $2",
    [hashedPassword, id]
  );
  return true;
};

// ✅ Eliminar un usuario
const deleteAdminUser = async (id: number): Promise<AdminUser | null> => {
  return await db.oneOrNone<AdminUser>(
    "DELETE FROM admin_user WHERE id = $1 RETURNING id, name, email, created_at, updated_at",
    [id]
  );
};

export {
  getAllAdminUsers,
  getOneAdminUser,
  authenticateAdminUser,
  createAdminUser,
  updateAdminUserPassword,
  deleteAdminUser,
};
