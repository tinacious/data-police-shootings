set -x

git remote add upstream git@github.com:washingtonpost/data-police-shootings.git
git fetch upstream
git checkout master # or your branch
git merge upstream/master
git checkout --ours README.md # Ignore the updated README.md which has conflicts
