export class RepoViewController {
  constructor(repo, GitHub){
    this.repo = repo;
    this.GitHub = GitHub;

    this.repo.loadRecentCommits().then((commits) => this.commits = commits);
  }
}

RepoViewController.$inject = ['repo','GitHub'];
