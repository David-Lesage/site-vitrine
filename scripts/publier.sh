#!/bin/zsh
# publier.sh : commit + push GitHub + publication Vercel du site, en une action (02/11/2026).
# zsh scripts/publier.sh "ce qui change"
set -u
cd "${0:a:h}/.." || exit 1
MESSAGE="${1:-Publication du site}"

[ "$(git branch --show-current)" = "main" ] || { echo "✗ On ne publie que depuis main."; exit 1; }
git fetch -q origin main || { echo "✗ GitHub injoignable, rien n'est publié."; exit 1; }
if ! git merge-base --is-ancestor origin/main HEAD; then
    echo "✗ GitHub a des commits que ce poste n'a pas (l'autre a publié)."
    echo "  Faire git pull, vérifier, puis relancer. Rien n'est publié."
    exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
    git add -A
    echo "▸ Fichiers commités :"
    git diff --cached --name-status | sed 's/^/    /'
    git commit -q -m "$MESSAGE ($(date '+%d/%m/%Y %H:%M'))" || exit 1
    echo "  ✓ Commit : $MESSAGE"
fi
git push -q origin HEAD:main || { echo "✗ Push refusé, rien n'est publié."; exit 1; }
echo "  ✓ GitHub à jour ($(git rev-parse --short HEAD))"

npx vercel@59.16.0 --prod --yes
