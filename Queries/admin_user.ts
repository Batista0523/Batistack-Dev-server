
import bcrypt from "bcrypt";
import db from "../DB/db.config";


interface AdminUser {
  id?: number;
  username?: string;
  email: string;
  password?: string;
  created_at?: string;
}


interface AuthenticatedAdminUser extends AdminUser {
  password_hash: string;
}

const getAllAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const allUsers = await db.any<AdminUser>("SELECT * FROM admin_user");
    return allUsers;
  } catch (err) {
    console.error("❌ Error retrieving admin users:", err);
    throw err;
  }
};


const getOneAdminUser = async (id: number): Promise<AdminUser | null> => {
  try {
    const oneUser = await db.oneOrNone<AdminUser>(
      "SELECT id, username, email, created_at FROM admin_user WHERE id = $1",
      [id]
    );
    return oneUser;
  } catch (err) {
    console.error("❌ Error retrieving one admin user:", err);
    throw err;
  }
};


const authenticateAdminUser = async (
  email: string,
  password: string
): Promise<AdminUser | null> => {
  try {
    const user = await db.oneOrNone<AuthenticatedAdminUser>(
      "SELECT * FROM admin_user WHERE email = $1",
      [email]
    );

    if (!user) throw new Error("Invalid email or password");

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) throw new Error("Invalid email or password");

    const { password_hash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    console.error("❌ Error during admin user authentication:", err);
    throw err;
  }
};


const createAdminUser = async (user: AdminUser): Promise<AdminUser> => {
  try {
    const existingUser = await db.oneOrNone<AdminUser>(
      "SELECT id FROM admin_user WHERE email = $1",
      [user.email]
    );
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(user.password!, 10);
    const createdUser = await db.one<AdminUser>(
      `INSERT INTO admin_user (username, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email, created_at`,
      [user.username, user.email, hashedPassword]
    );
    return createdUser;
  } catch (err) {
    console.error("❌ Error creating admin user:", err);
    throw err;
  }
};


const updateAdminUserPassword = async (
  id: number,
  newPassword: string
): Promise<boolean> => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.none(
      "UPDATE admin_user SET password = $1, updated_at = NOW() WHERE id = $2",
      [hashedPassword, id]
    );

    return true;
  } catch (err) {
    console.error("❌ Error updating admin user password:", err);
    throw err;
  }
};


const deleteAdminUser = async (id: number): Promise<AdminUser | null> => {
  try {
    const deletedUser = await db.oneOrNone<AdminUser>(
      "DELETE FROM admin_user WHERE id = $1 RETURNING id, username, email, created_at",
      [id]
    );
    return deletedUser;
  } catch (err) {
    console.error("❌ Error deleting admin user:", err);
    throw err;
  }
};

export {
  getAllAdminUsers,
  getOneAdminUser,
  authenticateAdminUser,
  createAdminUser,
  updateAdminUserPassword,
  deleteAdminUser
};
