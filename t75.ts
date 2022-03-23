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

`
> git status
On branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean.
`;

`Every time you perform a commit, you’re recording a snapshot of your project that you can revert to or compare to later.`;


`
freda173@D750:~/tgit$ echo 'test content' | git hash-object -w --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4
freda173@D750:~/tgit$


freda173@D750:~/tgit$  echo 'test content 2' | git hash-object -w --stdin
b13c288e945d00a4d16f195b33bf003b53d73dac
freda173@D750:~/tgit$
`;


`
C# has a language-level asynchronous programming model, which allows for easily writing asynchronous code
without having to juggle completion callbacks or conform to a library that supports asynchrony.
It follows what is known as the Task-based Asynchronous Pattern (TAP).
`;


export { };
