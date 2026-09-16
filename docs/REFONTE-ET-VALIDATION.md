# Refonte et validation — Island Mada Travel

Date : 16 septembre 2026.

## Résultat

Refonte des sept pages principales : accueil, destinations, Diégo-Suarez, Nosy Be, services, à propos et contact. Les contenus détaillés des lieux, les photographies originales et les cinq langues sont conservés.

## Design et lisibilité

- Identité émeraude, sable et vert profond, partagée par les composants existants et les nouveaux.
- Titres serif, hiérarchie plus lisible, marges progressives, ombres plus discrètes et surfaces mieux différenciées.
- En-têtes photographiques communs aux sept pages, avec boutons de navigation et pause.
- Suppression de l’agrandissement brutal de la taille racine sur les écrans larges ; largeur du contenu plafonnée à 1600 px sur les très grands écrans.
- Mode sombre cohérent pour les pages, cartes, formulaires, menu et pied de page. Application du thème dès le chargement initial.
- Préférence de mouvement réduit respectée ; galeries secondaires manuelles pour stabiliser la lecture.

## Navigation et parcours

- Navigation persistante, menu compact sous 1180 px, lien actif et lien d’accès direct au contenu.
- Menu mobile avec fermeture Échap, boucle de focus clavier, blocage du défilement arrière et restitution du focus.
- Sélecteur de langue natif accessible ; correction des accents mal encodés et repli sur le français pour les clés manquantes.
- Retour en haut lors d’un changement de page, gestion des ancres et titres de document par page.
- Fiches de lieux affichées après la rangée complète sélectionnée, quelle que soit la largeur.
- Boutons et descriptions des cartes visibles au toucher.
- Parcours de préparation en trois étapes et FAQ sur l’accueil et les services ; FAQ sur le contact.
- Pages d’information sur les données et les demandes de voyage, page 404 et liens de pied de page fonctionnels.

## Contact

- Destination préremplie depuis les pages Diégo-Suarez et Nosy Be.
- Association explicite des champs à leurs labels, saisie automatique, validation native et zones de saisie à 16 px minimum.
- Prévention des doubles envois et délai maximum de 20 secondes.
- Réussite uniquement lorsque FormSubmit confirme positivement l’envoi ; une réponse d’activation est affichée comme un échec.
- Conservation des champs en cas d’échec et lien WhatsApp de secours.
- Coordonnée e-mail du pied de page alignée sur le destinataire du formulaire existant.
- Carte Google Maps chargée sur action du visiteur, avec lien externe toujours disponible.

## Performances

- Images principales converties en WebP : 82 236 465 octets d’originaux contre 12 158 428 octets pour les versions principales optimisées, soit **85,2 % de réduction** sur cet ensemble. Les variantes mobiles s’ajoutent à cet ensemble mais le navigateur choisit une version adaptée.
- Logo : environ 2,16 Mo à 11,87 Ko.
- Variantes pour petits écrans sélectionnées avec `srcset`, chargement différé des images secondaires et dimensions explicites lorsque disponibles.
- Chargement à la demande des pages secondaires et des langues autres que le français.
- Originaux conservés ; script de génération documenté dans le README.

## Vérifications réalisées

| Contrôle | Résultat |
| --- | --- |
| Compilation Vite de production | Réussie |
| Sept pages × neuf largeurs × deux thèmes | 126 contrôles réussis |
| Largeurs | 320, 360, 390, 768, 1024, 1366, 1440, 1920 et 2560 px |
| Débordements horizontaux | Aucun détecté, y compris au niveau des éléments |
| Erreurs JavaScript | Aucune détectée |
| Clés de traduction visibles et erreurs d’encodage | Aucune détectée |
| Navigation clavier, menu et restitution du focus | Réussis |
| Changement de langue et persistance du thème | Réussis |
| Sélection des lieux, galerie et changement de catégorie | Réussis |
| Formulaire : validation, réussite et rejet d’activation | Réussis avec réponses simulées |
| Contexte mobile tactile à densité élevée | Portrait 393 × 851 et paysage 851 × 393 vérifiés |
| Navigation bureau dans cinq langues | 25 combinaisons vérifiées, sans collision ni débordement |
| Diff Git : espaces et fins de ligne superflus | Contrôle réussi |

Les captures complètes de chaque page à 390 et 1440 px, dans les deux thèmes, sont dans `artifacts/qa`. Une capture supplémentaire de l’accueil à 2560 px et du formulaire sombre est également disponible. Le rapport automatisé est dans `artifacts/qa/report.json` ; les contrôles multilingues de navigation sont dans `artifacts/qa/navigation-languages.json`.

## Limites de la validation

- Android est simulé dans Chromium ; aucun téléphone Android physique n’a été utilisé.
- Les requêtes FormSubmit des tests ont été interceptées : aucun message réel n’a été envoyé. La réception réelle dépend toujours de l’activation et du fonctionnement du service externe.
- Les contrôles d’accessibilité réalisés ne constituent pas un audit WCAG exhaustif.
- Les performances réseau en conditions réelles et les Core Web Vitals ne sont pas mesurés ici.
- La version modifiée est locale. Aucun déploiement public n’a été effectué.
