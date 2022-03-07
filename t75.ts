`git config --list --show-origin`;

`
Your Identity

The first thing you should do when you install Git is to set your user name and email address.
This is important because every Git commit uses this information, and it’s immutably baked into
the commits you start creating:

$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
`;

`
Getting a Git Repository

You typically obtain a Git repository in one of two ways:

  1) You can take a local directory that is currently not under version control,
     and turn it into a Git repository, or
  2) You can clone an existing Git repository from elsewhere.

In either case, you end up with a Git repository on your local machine, ready for work.
`;



export { };
