import { UserRepository } from "../../repositories/UserRepository";
import { AppError } from "../../utils/AppError";
import * as EmailValidator from "email-validator";
import { hashSync } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;

}
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#?])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/;

class UserCreateService {
  repository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.repository = userRepository;
  }

  async execute({ name, email, password }: UserRequest) {
 
   
    if (!name) {
      throw new AppError("Nome é obrigatório.");
    }
   
    if (!email) {
      throw new AppError("Email é obrigatório.");
    }
  

    if (!password) {
      throw new AppError("Senha é obrigatória.");
      
    }
   

    if (!EmailValidator.validate(email)) {
      throw new AppError("Email inválido.");
    }
    // if (!passwordRegex.test(password)) {
    //   throw new AppError(
    //     "Senha inválida, a senha deve conter ao menos um digito, uma letra minúscula, uma letra maiúscula, um caractere especial e ao menos 8 caracteres"
    //   );
    // }
    const userWithEmail = await this.repository.showByEmail(email);

    if (userWithEmail) {
      throw new AppError("Email já cadastrado", 403);
    }

    const hashedPassword = hashSync(password);

    try {
       await this.repository.create({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw new AppError("erro ao cadastrar usuario")
    }
     
  }
}

export { UserCreateService };