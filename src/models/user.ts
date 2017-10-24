import { Task } from './task';

export interface User{
  email: string;     //type string
  password: string;
  userId: string;
  lastName: string;
  firstName: string;
  introduction: string;
  //interests: string[];
  skills: boolean[];
  ownedTask: Task[];
  blackListTask: Task[];
  confirmTask: Task[];
  pendingTask: Task[];

}



//https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information
//TODO method to retrieve user info

//TODO method to edit/update user info

//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)
/*create new user
function createUser(user: User): { email : string; password : string;}
{
  let newUser = {email : user.email,
                password : user.password};
  return newUser;
}
*/

//TODO method to retrieve user info
