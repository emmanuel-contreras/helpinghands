import { User } from './user';
import { userProfile} from "./userProfile";


export class Task {
  //attributes for task.
  constructor(    //public user : userProfile,         //or put just put email attributes here
                  public timeDuration : number,
                  public timeStart : number,
                  public introduction : string,
                  public requirement : string,
                  public wantedSkill : boolean[]){}


  constructor(
    public timeDuration : number,
    public timeStart : number,
    public introduction : string,
    public requirement : string,
    public wantedSkill : boolean[],
    public complete: boolean,
    public id: number,
    public name: string,
    public helpers: User[],
    public appliedHelpers: User[]
  ){}

}
