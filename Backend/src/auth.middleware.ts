import type {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET=process.env.JWT_SECRET ?? "testsecret";

export interface JwtPayload {
    userId:string;
    email:string;
}

declare global {
    namespace Express {
        interface Request {
            user?:JwtPayload;
        }
    }
}
export function requireAuth(req:Request,res:Response,next:NextFunction){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error:"Unauthorized"});
    }
    const token=authHeader.slice(7);
    try {
         const decoded = jwt.verify(token, JWT_SECRET);
          if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      typeof decoded.email !== "string"
    ) {
      return res.status(401).json({
        error: "Invalid token payload",
      });
    }
        req.user={
            userId:decoded.userId,
            email:decoded.email
        };
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}