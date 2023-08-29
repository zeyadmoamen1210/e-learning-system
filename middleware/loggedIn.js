export default function ({
  app,
  redirect,
  $auth
}) {
  // not student
  if ($auth.loggedIn ) {
    if($auth.user.role_id != 3) {
      // dashboard
      return redirect('/dashboard');
    }
    else {
      // student
      return redirect('/student');
    }
  }
}
