import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { firebaseAdmin } from "../../firebase/init.firebase";
import { prisma } from "../../core/prisma";

type InternalErrorResponse = {
  success: false;
};
type InternalSuccessResponse<T> = {
  success: true;
  decodedToken: T;
};

type InternalResponse<T> = InternalSuccessResponse<T> | InternalErrorResponse;

class UserService {
  async getDecodedToken(
    tokenId: string,
  ): Promise<InternalResponse<DecodedIdToken>> {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(tokenId);
      return {
        success: true,
        decodedToken,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  async isUserExists(uid: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
    });
  }

  async createUser(tokenId: string) {
    const decodedToken = await this.getDecodedToken(tokenId);

    if (decodedToken.success === false) {
      throw new Error("Invalid token");
    }

    let email = decodedToken.decodedToken.email;

    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
    });

    if (user) throw new Error("User already exists");

    const newUser = await prisma.user.create({
      data: {
        uid: decodedToken.decodedToken.uid,
        email: email,
        name: decodedToken.decodedToken.name,
        role: "USER",
        isEmailVerified: decodedToken.decodedToken.email_verified,
      },
    });

    return newUser;
  }
}

export const userService = new UserService();
