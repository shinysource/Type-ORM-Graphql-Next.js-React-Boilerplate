import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { compare, hash } from "bcrypt";
import { Repository } from "typeorm";
import makeRandom from "../../lib/makeRandom";
import { User } from "../../entity/User.entity";
import { ResolverContext } from "../../lib/types";
import ServerError from "../../lib/ServerError";

@Resolver(returns => String)
export class AuthResolver {
  @InjectRepository(User)
  private userRepo: Repository<User>;

  // grpahql needs at least one query
  @Query(returns => String)
  ping() {
    return "pong";
  }

  @Query(returns => User)
  async me(@Ctx() { req: { session } }): Promise<User> {
    if (!session?.user) {
      throw new ServerError("Invalid session", {
        status: 403,
      });
    }

    return this.userRepo.findOneOrFail({ id: session.user.id });
  }

  @Mutation(returns => User)
  async signup(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("contact") contact: string,
    @Arg("dob") dob: string,
    @Arg("name") name: string,
    @Ctx() { req: { session } }: ResolverContext
  ): Promise<User> {
    try {
      const existingUser = await this.userRepo.findOne({ email });

      if (existingUser) {
        throw new ServerError("User already exists", {
          status: 403,
        });
      }

      const user = new User();
      user.email = email;
      user.password = await hash(password, 10);
      user.name = name;
      user.dob = dob;
      user.contact = contact;

      await user.save();
      await user.reload();
      // eslint-disable-next-line no-param-reassign
      session.user = user;

      return user;
    } catch (error) {
      console.error("[Error] login Mutation", error);

      throw new ServerError(error.message);
    }
  }

  @Mutation(returns => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req: { session } }: ResolverContext
  ): Promise<User> {
    try {
      const existingUser = await this.userRepo.findOne({ email });

      if (!existingUser) {
        throw new ServerError("Invalid email/password", {
          status: 403,
        });
      }

      const isValidPassword = await compare(password, existingUser.password);
      if (!isValidPassword) {
        throw new ServerError("Invalid email/password", {
          status: 403,
        });
      }

      // eslint-disable-next-line no-param-reassign
      session.user = existingUser;

      return existingUser;
    } catch (error) {
      console.error("[Error] login Mutation", error);

      throw new ServerError(error.message);
    }
  }

  @Authorized()
  @Mutation(returns => String)
  async logout(@Ctx() { req }: ResolverContext) {
    req.session = null;

    return "ok";
  }

  @Mutation(returns => String)
  async sendPasswordResetOtp(@Ctx() { req }: ResolverContext, @Arg("email") email: string) {
    try {
      await this.userRepo.findOneOrFail({ email });

      const otp = makeRandom(6).toUpperCase();
      req.session.passwordReset = {
        email,
        otp,
      };

      req.session.cookie.maxAge = 1000 * 60 * 5;

      // mail.sendMail({
      //   to: email,
      //   subject: `Password reset OTP from "${APP_NAME}"`,
      //   html: `<p>Your OTP is</p> <h1>${otp} </h1>`,
      // });
    } catch (err) {
      console.error("[Error: sendPasswordResetOtp]", err);
    }
    return "ok";
  }

  @Mutation(returns => User)
  async resetPassword(
    @Ctx() { req }: ResolverContext,
    @Arg("newPassword") newPassword: string,
    @Arg("otp") inputOtp: string
  ): Promise<User> {
    const otp = "11111";
    const email = req.session.passwordReset?.email;

    if (!otp || !email) {
      throw new ServerError("Incorrect OTP!", { status: 401 });
    }
    const existingUser = await this.userRepo.findOne({ email });

    if (!existingUser || otp !== inputOtp) {
      throw new ServerError("Incorrect OTP!", { status: 401 });
    }

    existingUser.password = await hash(newPassword, 10);
    await this.userRepo.save(existingUser);

    return this.userRepo.findOneOrFail({ id: existingUser.id });
  }
}
