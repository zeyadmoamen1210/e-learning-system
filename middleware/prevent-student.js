export default function ({
  app,
  redirect,
  $auth
}) {
  // student
  if ($auth.loggedIn && $auth.user.role_id == 3 ) {
      return redirect('/student');
  }
}
