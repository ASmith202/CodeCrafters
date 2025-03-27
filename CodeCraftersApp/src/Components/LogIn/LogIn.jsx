import Navigation from "../Navigation/navigation";

function LogIn() {
    return (
        <div>
        <Navigation />
    <form>
    <div>
      <label for="uname">username: </label>
      <input type="text" id="uname" name="name" />
      <label for="password">password: </label>
      <input type="text" id="password" name="password" />
    </div>
    <div>
      <button>Submit</button>
    </div>
  </form> 
  </div> 

);
}
export default LogIn;