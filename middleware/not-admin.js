export default function ({
  app,
  redirect,
  $auth
}) {
  // not student
  if ($auth.loggedIn && $auth.user.role_id != 3 ) {
      return redirect('/dashboard');
  }
}
