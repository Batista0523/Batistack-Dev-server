
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  getAllAdminUsers,
  getOneAdminUser,
  authenticateAdminUser,
  createAdminUser,
  updateAdminUserPassword,
  deleteAdminUser
} from "../Queries/admin_user";
import dotenv from "dotenv";
dotenv.config();

const AdminUser = express.Router();


AdminUser.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await createAdminUser({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, payload: newUser });
  } catch (error) {
    console.error("❌ Error registering admin user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


AdminUser.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
  
    const user = await authenticateAdminUser(email, password);

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("❌ Error logging in admin user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


AdminUser.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await getAllAdminUsers();
    res.status(200).json({ success: true, payload: allUsers });
  } catch (error) {
    console.error("❌ Error retrieving admin users:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


AdminUser.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getOneAdminUser(Number(id));
    if (!user) {
      return res.status(404).json({ success: false, error: "Admin user not found" });
    }
    res.status(200).json({ success: true, payload: user });
  } catch (error) {
    console.error("❌ Error retrieving admin user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});


AdminUser.put("/update-password", async (req: Request, res: Response) => {
  const { id, newPassword } = req.body;

  try {
    await updateAdminUserPassword(id, newPassword);
    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Error updating password:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

AdminUser.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteAdminUser(Number(id));
    res.status(200).json({ success: true, message: "Admin user deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting admin user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default AdminUser;
