export interface LegalFactSheet {
  id: string;
  category: 'urgence' | 'procedures' | 'finances_logement' | 'preuves_medical' | 'dispositifs';
  title: string;
  subtitle: string;
  badge: string;
  summary: string;
  keySteps: { step: string; detail: string }[];
  legalBasis: string[];
  practicalAdvice: string[];
  emergencyContacts: { name: string; number: string; description: string }[];
}

export const LEGAL_FACT_SHEETS: LegalFactSheet[] = [
  {
    id: 'quitter-domicile',
    category: 'urgence',
    title: "1. Quitter le domicile en urgence avec les enfants",
    subtitle: "Démystification de 'l'abandon de domicile' et protection de la fratrie",
    badge: "Priorité Immédiate",
    summary: "En droit français, la mise en sécurité d'une personne et de ses enfants prime sur le devoir de communauté de vie. Vous avez le droit absolu de quitter immédiatement le logement sans commettre d'infraction pénale.",
    keySteps: [
      {
        step: "Se mettre en lieu sûr immédiatement",
        detail: "Rejoignez un proche de confiance, un hébergement d'urgence (3919 ou 115) ou un commissariat. Ne prévenez pas le conjoint de votre destination exacte."
      },
      {
        step: "Déposer une déclaration de main courante de départ",
        detail: "Signalez aux forces de l'ordre que vous quittez le domicile en raison des violences pour vous protéger avec les enfants, afin de dater officiellement la séparation de fait."
      },
      {
        step: "Emporter les documents vitaux prioritaires",
        detail: "Pièces d'identité, livret de famille, carnets de santé des enfants, carte vitale, justificatifs de revenus, ordonnances médicales, moyens de paiement."
      },
      {
        step: "Saisir sans délai le Juge aux Affaires Familiales (JAF)",
        detail: "Faites déposer une requête en urgence (ordonnance de protection ou fixation des mesures provisoires) par un avocat pour officialiser la résidence des enfants."
      }
    ],
    legalBasis: [
      "Article 212 et 215 du Code Civil (exception d'obligation de cohabitation pour motifs légitimes et péril)",
      "Jurisprudence constante de la Cour de Cassation (l'état de nécessité justifie le départ immédiat)",
      "Article 371-1 du Code Civil (protection de l'intérêt supérieur de l'enfant)"
    ],
    practicalAdvice: [
      "Si vous n'avez pas pu emporter vos affaires, vous pouvez demander à la police ou gendarmerie de vous accompagner plus tard pour récupérer vos effets personnels et ceux des enfants.",
      "Informez l'école des enfants de la situation dès que possible et demandez par écrit de ne remettre les enfants à personne d'autre que vous sans décision de justice contraire."
    ],
    emergencyContacts: [
      { name: "3919", number: "3919", description: "Violences Femmes Info (Appel gratuit, anonyme et invisible sur les factures, 24/7)" },
      { name: "17 / 112", number: "17", description: "Police Secours / Gendarmerie (En cas de danger imminent)" }
    ]
  },
  {
    id: 'ordonnance-protection',
    category: 'procedures',
    title: "2. L'Ordonnance de Protection (JAF délivrée en 6 jours max)",
    subtitle: "Mesure d'éviction du conjoint et protection légale immédiate sans plainte obligatoire",
    badge: "Bouclier Judiciaire",
    summary: "L'Ordonnance de Protection est délivrée par le Juge aux Affaires Familiales en 6 jours maximum dès lors qu'il existe des raisons sérieuses de considérer comme vraisemblables les violences et le danger encouru.",
    keySteps: [
      {
        step: "Saisine du Juge aux Affaires Familiales (JAF)",
        detail: "Dépôt d'une requête auprès du Tribunal Judiciaire compétent, avec l'aide d'un avocat (aide juridictionnelle accordée sans condition de ressources)."
      },
      {
        step: "Éviction du conjoint violent du domicile",
        detail: "Le juge peut ordonner le départ forcé du conjoint et vous attribuer la jouissance exclusive du logement commun (même si le bail est à son nom ou s'il est propriétaire)."
      },
      {
        step: "Interdiction de contact et de paraître",
        detail: "Interdiction formelle pour l'auteur de s'approcher de vous, de votre travail, de l'école des enfants, ou de vous contacter par quelque moyen que ce soit."
      },
      {
        step: "Mesures relatives aux enfants et dissimulation d'adresse",
        detail: "Fixation de l'autorité parentale exclusive, suspension ou aménagement des droits de visite en lieu médiatisé neutre, et masquage légal de votre nouvelle adresse."
      }
    ],
    legalBasis: [
      "Articles 515-9 à 515-13 du Code Civil (création et champ d'application de l'Ordonnance de Protection)",
      "Loi n° 2019-1480 et Loi n° 2020-936 (délai impératif de 6 jours pour statuer)",
      "Article 227-4-2 du Code Pénal (la violation des obligations de l'ordonnance est un délit puni de 2 ans de prison et 15 000 € d'amende)"
    ],
    practicalAdvice: [
      "Rassemblez tous les éléments matériels possibles : certificats médicaux, captures SMS, mails, attestations de proches ou de voisins rédigées sur formulaire Cerfa.",
      "Conservez une copie certifiée de l'Ordonnance de Protection sur vous en permanence et prévenez le commissariat de votre secteur."
    ],
    emergencyContacts: [
      { name: "3919", number: "3919", description: "Écoute, orientation et mise en relation avec des avocats spécialisés" },
      { name: "116 006", number: "116006", description: "France Victimes (Assistance juridique et psychologique gratuite)" }
    ]
  },
  {
    id: 'preuves-certificat-itt',
    category: 'preuves_medical',
    title: "3. Constat Médical & Certificat ITT (Unités Médico-Judiciaires)",
    subtitle: "Figer les preuves physiques et psychologiques sans obligation de plainte préalable",
    badge: "Preuve Médicale Clé",
    summary: "Le certificat médical initial descriptif et l'Incapacité Totale de Travail (ITT) constituent la pièce maîtresse du dossier juridique. L'ITT mesure le retentissement des violences sur les actes de la vie courante, qu'elles soient physiques ou psychologiques.",
    keySteps: [
      {
        step: "Consulter un médecin au plus vite après les faits",
        detail: "Consultez aux urgences hospitalières, auprès de votre médecin généraliste ou d'une Unité Médico-Judiciaire (UMJ)."
      },
      {
        step: "Faire décrire minutieusement toutes les lésions et l'état psychologique",
        detail: "Exigez la mention détaillée des hématomes, griffures, douleurs, ecchymoses mais aussi des insomnies, angoisses, sidération et stress post-traumatique."
      },
      {
        step: "Demander la quantification de l'ITT pénale",
        detail: "L'ITT pénale s'applique même si vous êtes sans emploi, étudiante ou au foyer : elle conditionne la gravité de la qualification pénale de l'infraction."
      },
      {
        step: "Conserver l'original et photographier les blessures",
        detail: "Prenez des photos en gros plan avec une règle ou pièce de monnaie pour donner l'échelle, ainsi qu'une photo montrant votre visage pour l'authentification."
      }
    ],
    legalBasis: [
      "Articles 222-11 à 222-14 du Code Pénal (aggravation des peines selon la durée de l'ITT et le lien de conjugalité)",
      "Article R4127-76 du Code de Déontologie Médicale (obligation d'assistance et de délivrance de constat médical)",
      "Loi du 30 juillet 2020 (levée possible du secret médical par le praticien en cas de danger immédiat pour la vie de la victime sous emprise)"
    ],
    practicalAdvice: [
      "Ne minimisez rien devant le praticien : décrivez les violences verbales, le chantage, les privations de sommeil et de nourriture.",
      "Gardez les certificats dans le coffre-fort numérique sécurisé de cette application ou confiez une copie à un tiers de confiance."
    ],
    emergencyContacts: [
      { name: "15 / SAMU", number: "15", description: "Secours médicaux d'urgence" },
      { name: "UMJ (via 17 ou hôpital)", number: "17", description: "Unités Médico-Judiciaires spécialisées dans les expertises médico-légales" }
    ]
  },
  {
    id: 'aides-financieres-urgence',
    category: 'finances_logement',
    title: "4. Aide Financière d'Urgence CAF & Mesures Bancaires",
    subtitle: "Aide universelle d'urgence versée sous 3 à 5 jours et protection de vos avoirs",
    badge: "Indépendance Économique",
    summary: "Depuis fin 2023, la CAF et la MSA attribuent une Aide Universelle d'Urgence versée en 3 à 5 jours ouvrés à toute personne victime de violences conjugales, sans conditions de ressources restrictives pour la demande.",
    keySteps: [
      {
        step: "Faire la demande d'Aide Universelle d'Urgence (CAF/MSA)",
        detail: "Demande en ligne ou au guichet sur présentation d'un justificatif de moins de 12 mois (plainte, main courante, ordonnance de protection ou signalement au procureur)."
      },
      {
        step: "Montant et versement rapide (3 à 5 jours)",
        detail: "Aide forfaitaire d'au moins 240 € à plus de 1 000 € selon le nombre d'enfants à charge, attribuée sous forme de don non remboursable ou prêt à taux zéro."
      },
      {
        step: "Désolidariser immédiatement les comptes joints",
        detail: "Envoyez une lettre recommandée à la banque pour révoquer la solidarité active et passive sur le compte joint et annuler toutes les procurations réciproques."
      },
      {
        step: "Ouvrir un compte bancaire individuel et secret",
        detail: "Ouvrez un compte dans un autre établissement avec domiciliation du courrier chez un proche ou en boîte postale associative."
      }
    ],
    legalBasis: [
      "Loi n° 2023-140 du 28 février 2023 créant l'aide universelle d'urgence pour les victimes de violences conjugales",
      "Articles L. 214-8 et suivants du Code de l'Action Sociale et des Familles",
      "Article 220 du Code Civil (désolidarisation des dettes ménagères non manifestement excessives)"
    ],
    practicalAdvice: [
      "La CAF gère la demande dans un circuit prioritaire dédié : vos coordonnées bancaires et postales sont strictement masquées.",
      "Demandez également l'activation du Forfait d'Urgence Logement auprès des services sociaux de votre mairie ou du CCAS."
    ],
    emergencyContacts: [
      { name: "3230 (CAF)", number: "3230", description: "Service CAF - Signalement violences conjugales prioritaire" },
      { name: "3919", number: "3919", description: "Accompagnement dans les démarches administratives et sociales" }
    ]
  },
  {
    id: 'dispositifs-tgd-bar',
    category: 'dispositifs',
    title: "5. Téléphone Grave Danger (TGD) & Bracelet Anti-Rapprochement",
    subtitle: "Dispositifs d'alerte et d'intervention policière prioritaire en temps réel",
    badge: "Haute Protection",
    summary: "Ces dispositifs technologiques et judiciaires permettent une protection renforcée 24h/24 par les forces de l'ordre en cas de risque grave de récidive de violences.",
    keySteps: [
      {
        step: "Téléphone Grave Danger (TGD)",
        detail: "Smartphone sécurisé doté d'un bouton d'alerte SOS dédié. En cas de pression, une liaison immédiate est établie avec une plateforme qui géolocalise et envoie la police/gendarmerie en priorité absolue."
      },
      {
        step: "Attribution du TGD par le Procureur",
        detail: "Accordé par le Procureur de la République (sur proposition d'une association d'aide aux victimes ou des services enquêteurs), dès lors que l'auteur est interdit de contact ou en fuite."
      },
      {
        step: "Bracelet Anti-Rapprochement (BAR)",
        detail: "Dispositif électronique fixé à la cheville de l'auteur couplé à un boîtier récepteur pour la victime, créant une zone de pré-alerte et d'alerte (1 à 10 km) déclenchant l'intervention policière."
      },
      {
        step: "Mise en place en pré-sentenciel ou post-sentenciel",
        detail: "Prononcé par le JAF (dans le cadre de l'ordonnance de protection avec accord de l'auteur) ou par le juge pénal (contrôle judiciaire ou peine)."
      }
    ],
    legalBasis: [
      "Article 41-3-1 du Code de Procédure Pénale (cadre légal du Téléphone Grave Danger)",
      "Article 132-45-1 du Code Pénal et Art. 515-11-1 du Code Civil (Bracelet Anti-Rapprochement)",
      "Décret n° 2020-1161 du 23 septembre 2020 relatif au dispositif électronique mobile anti-rapprochement"
    ],
    practicalAdvice: [
      "Si vous vous sentez suivie ou en danger persistant, demandez expressément à votre avocat ou à l'association France Victimes (116 006) de solliciter un TGD auprès du parquet.",
      "Le TGD offre aussi un soutien psychologique accessible 24/7 par simple bouton."
    ],
    emergencyContacts: [
      { name: "17", number: "17", description: "Intervention secours immédiate" },
      { name: "116 006", number: "116006", description: "France Victimes - Évaluation du besoin pour TGD" }
    ]
  },
  {
    id: 'plainte-vs-main-courante',
    category: 'procedures',
    title: "6. Dépôt de Plainte & Droits face au Refus de Guichet",
    subtitle: "Règles légales obligatoires pour les commissariats et plainte directe au Procureur",
    badge: "Procédure Pénale",
    summary: "Tout officier ou agent de police judiciaire a l'obligation légale d'enregistrer votre plainte pour violences conjugales, quel que soit le lieu des faits ou le commissariat choisi.",
    keySteps: [
      {
        step: "Principe du guichet unique obligatoire",
        detail: "Vous pouvez porter plainte dans N'IMPORTE QUEL commissariat ou brigade de gendarmerie de France. Le refus de prise de plainte est formellement illégal."
      },
      {
        step: "Main courante vs Plainte pénale",
        detail: "La main courante relate un fait sans lancer de poursuites. Pour les faits de violences, menaces ou harcèlement, exigez TOUJOURS une Plainte pour que le Procureur puisse agir et ordonner des mesures coercitives."
      },
      {
        step: "Que faire en cas de réticence des policiers ?",
        detail: "Rappelez l'article 15-3 du Code de Procédure Pénale. Si nécessaire, faites-vous accompagner par un avocat ou un intervenant social en commissariat."
      },
      {
        step: "Plainte directe par courrier au Procureur de la République",
        detail: "Envoyez une lettre recommandée avec accusé de réception directement au Procureur du Tribunal Judiciaire avec le récit des faits, dates, lieux et copies des preuves/certificats."
      }
    ],
    legalBasis: [
      "Article 15-3 du Code de Procédure Pénale (obligation stricte de recevoir et enregistrer les plaintes)",
      "Article 40 du Code de Procédure Pénale (rôle du Procureur de la République dans la poursuite des infractions)",
      "Circulaire ministérielle sur le traitement prioritaire des violences intrafamiliales"
    ],
    practicalAdvice: [
      "Demandez systématiquement et immédiatement une copie intégrale de votre procès-verbal de dépôt de plainte avec le numéro de référence du dossier.",
      "Vous pouvez être assistée d'un avocat dès l'audition de dépôt de plainte."
    ],
    emergencyContacts: [
      { name: "3919", number: "3919", description: "Soutien et préparation au dépôt de plainte" },
      { name: "114", number: "114", description: "Alerte discrète par SMS (si vous ne pouvez pas parler)" }
    ]
  },
  {
    id: 'cyberharcelement-espionnage',
    category: 'urgences_modernes' as any,
    title: "7. Cyber-harcèlement, Traqueurs GPS & Logiciels Espions",
    subtitle: "Répression pénale de la surveillance illégale et préservation des preuves numériques",
    badge: "Sécurité Numérique",
    summary: "L'installation de logiciels espions, le traçage géographique sans consentement (AirTags, balises GPS) et le harcèlement en ligne au sein du couple sont sévèrement réprimés par le Code Pénal.",
    keySteps: [
      {
        step: "Ne pas réinitialiser immédiatement le téléphone",
        detail: "Si vous suspectez un logiciel espion, ne le supprimez pas tout de suite : faites d'abord constater la présence du traceur/mouchard par un commissariat ou un huissier pour conserver la preuve."
      },
      {
        step: "Captures d'écran probantes",
        detail: "Prenez des captures d'écran des messages de menaces, appels répétés et historiques en veillant à afficher l'heure, la date et le numéro complet de l'expéditeur."
      },
      {
        step: "Sécurisation des comptes et mots de passe",
        detail: "Modifiez vos mots de passe depuis un appareil sécurisé non surveillé (au travail ou chez un proche). Activez la double authentification sur une adresse email secrète."
      },
      {
        step: "Sanctions pénales aggravées",
        detail: "Le harcèlement moral au sein du couple avec utilisation d'un moyen de communication en ligne est puni de 3 à 5 ans d'emprisonnement et 75 000 € d'amende."
      }
    ],
    legalBasis: [
      "Article 222-33-2-2 du Code Pénal (harcèlement au sein du couple commis par voie électronique)",
      "Article 226-15 et 226-1 du Code Pénal (violation du secret des correspondances et atteinte à l'intimité de la vie privée)",
      "Article 323-1 du Code Pénal (accès et maintien frauduleux dans un système de traitement automatisé de données)"
    ],
    practicalAdvice: [
      "Désactivez le partage de position familial (Apple Partage Familial, Google Family Link) et vérifiez les appareils connectés à votre compte Google/Apple.",
      "Utilisez le bouton 'Sortie Rapide / Camouflage' de notre application si quelqu'un s'approche de votre écran."
    ],
    emergencyContacts: [
      { name: "3018", number: "3018", description: "Numéro national d'aide contre les violences numériques et cyberharcèlement" },
      { name: "3919", number: "3919", description: "Violences Femmes Info" }
    ]
  },
  {
    id: 'logement-dalo-relogement',
    category: 'finances_logement',
    title: "8. Relogement Prioritaire & Droit au Logement Opposable (DALO)",
    subtitle: "Priorité absolue d'attribution de logement social pour les victimes de violences",
    badge: "Toit & Sécurité",
    summary: "Les personnes victimes de violences conjugales ou familiales bénéficient d'un statut prioritaire légal au titre du DALO et des contingents préfectoraux de logements sociaux.",
    keySteps: [
      {
        step: "Hébergement d'urgence immédiat (115 / FNSF)",
        detail: "Mise à l'abri d'urgence dans un centre d'hébergement sécurisé ou hôtel d'urgence avec accompagnement par un travailleur social."
      },
      {
        step: "Dépôt d'un dossier DALO prioritaire",
        detail: "Constituez un dossier de recours DALO auprès de la préfecture avec la mention expresse 'victime de violences au sein du couple'."
      },
      {
        step: "Délai de relogement contraignant pour l'État",
        detail: "La commission de médiation doit statuer en urgence sous 3 mois (ou 6 semaines selon les départements) et le préfet a l'obligation de vous proposer un logement pérenne."
      },
      {
        step: "Bail glissant et aides à l'installation",
        detail: "Possibilité d'obtenir l'Aide au Logement (APL) d'urgence et le Fonds de Solidarité pour le Logement (FSL) pour payer la caution et le premier loyer."
      }
    ],
    legalBasis: [
      "Article L. 441-1 du Code de la Construction et de l'Habitation (priorité d'attribution de logement social pour les victimes de violences)",
      "Loi n° 2007-290 du 5 mars 2007 instituant le Droit au Logement Opposable (DALO)",
      "Article 8-2 de la Loi du 6 juillet 1989 (résiliation sans préavis et fin de solidarité du bail pour la victime de violences)"
    ],
    practicalAdvice: [
      "Si vous quittez un logement dont vous êtes colocataire avec le conjoint violent, fournissez au bailleur une copie de l'ordonnance de protection ou du dépôt de plainte : votre solidarité sur le loyer prend fin immédiatement.",
      "Ne restez pas isolée : un travailleur social du CCAS ou d'une association conventionnée peut porter votre dossier DALO."
    ],
    emergencyContacts: [
      { name: "115", number: "115", description: "Samu Social / Hébergement d'urgence (gratuit 24/7)" },
      { name: "3919", number: "3919", description: "Orientation vers les centres d'hébergement spécialisés et sécurisés" }
    ]
  }
];
