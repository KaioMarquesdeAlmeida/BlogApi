import secureKey from "./secureKey";
import { sign, verify } from "jsonwebtoken";
interface tokenCreatorParams{
  id: number;
};
class GlobalClass {
  tokenCreator( tokenCreatorParams: tokenCreatorParams ){
    const tokenConfig = {
      expiresIn: '7d'
    };
    const token = sign(tokenCreatorParams, secureKey, tokenConfig);
    return token;
  }
  tokenResolver(token: string){
    try {
      const resolvedToken = verify(token, secureKey);
      return resolvedToken;
    } catch {
      return false
    }
  }
}

export { GlobalClass };