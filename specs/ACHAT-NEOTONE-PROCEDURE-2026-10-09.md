# Formulaire d'achat Neotone — cadrage (enquête du 09/10/2026, lecture seule)

## Procédure Neotone (mails)
- Réf. : Gergely (partners@) 17/08 msg 1a00ef447c8133b3. Carte uniquement, lien de paiement envoyé par Neotone au client sous ~1 h,
  lun-ven 9h-17h heure de Budapest. Infos à envoyer à **neotone@digitalhandpan.com** (Dani, toujours en copie) : nom complet,
  adresse de facturation, e-mail, téléphone, n° TVA si applicable. Facture + proforma via soundventure.kft@szamlazz.hu.
- 28/09 (1a0e6e669bfea46f) : prix final exact AVANT facture ; re-vérifier les coordonnées (coquille e-mail + erreur de prix sur #799 → avoirs).
  Nouvelle étape : Neotone prévient David à chaque facture, David vérifie nom + prix et confirme.
- 29/09 (1a0ed199ffa06b3a) : pas de support le week-end → préparer les liens en semaine (ex. un lien One + un lien Mutant), prix convenu avant.
- 02/10 (1a0e29167c73f77b) : TVA FR 20 % ; exonération seulement n° intracom valide ou export prouvé ; pas de PABLO.
- Marge totale 25 % (remise client + commission) ; pas de paiement en ligne autonome (Stripe abandonné, Wise pas prévu).

## Sheet « ParisHub_Neotone_Orders », onglet « Orders Total »
Cases VIOLETTES (remplies par David) : **O Customer discount · R Name of the Customer · S Valid EU VAT Number ·
T Billing adress of the customer · U Email of the Customer**. M Price to customer ≈ K × (1 − O) (formule supposée). Pas de colonne téléphone.
N (cyan) = taux de TVA, origine inconnue. Le connecteur Sheets n'a pas accès (autre compte) → écrire via l'Apps Script contact@.

## Existant
- Site : formulaire facturation /le-neotone en prod (mail à David seulement) ; saleIntake.ts éteint (5 étapes, voir handoff 08/10).
- App : EF sale-intake v1 (purchase_channel forcé 'online' → à corriger) ; EF send-sale-to-partner NON commitée/déployée, bouton UI non branché.
- Rien n'écrit dans le Sheet aujourd'hui.

## Parcours proposé
Client remplit le formulaire (+ encart procédure) → vente déposée dans l'app (sale-intake) → David choisit n° de série + prix → clic
« Envoyer à Neotone » = mail à neotone@ + écriture des cases violettes (doPost Apps Script protégé, par nom d'en-tête, jamais
écraser une case non vide) → Neotone facture et envoie le lien → David vérifie et confirme.

## ✅ Décisions de David (10/10/2026)
1. Envoi à Neotone **après le clic de David** dans l'app (jamais automatique à la soumission).
2. Remise par défaut : **−7 % showroom / −5 % en ligne** (mode choisi par le client), modifiable par David avant l'envoi.
3. **Client en copie** du mail envoyé à Neotone.
4. ~~Colonne Phone~~ → **ANNULÉ (David 10/10)** : « mettre le numéro dans la colonne W "Billing adress of the customer" […] tout dans la même case nom, prénom, adresse, numéro de TVA si applicable ». Aucun mail à Neotone nécessaire.

## Répartition
- SITE (cette session) : formulaire + encart procédure + confirmation e-mail + consentement transmission à Soundventure ;
  dépôt serveur vers `sale-intake` (étapes 1-4 du handoff 08/10) ; `doPost` de l'Apps Script (écriture des cases violettes par
  nom d'en-tête, secret partagé, jamais écraser une case non vide). Premier appel réel AVEC la session APP + feu vert David.
- APP : bouton « Envoyer à Neotone » (aperçu dry_run, choix n° de série + prix), EF send-sale-to-partner (Dani en destinataire,
  client en copie) + appel du doPost ; corriger `purchase_channel` forcé à 'online' dans sale-intake.

