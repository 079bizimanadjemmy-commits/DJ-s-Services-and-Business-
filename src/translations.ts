
export type Language = 'en' | 'rw' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      gallery: 'Gallery',
      videos: 'Videos',
      testimonials: 'Testimonials',
      location: 'Location',
      contact: 'Contact',
      bookNow: 'Book Now',
    },
    hero: {
      aiPowered: 'AI-Powered Entertainment',
      subtitle: 'Weddings • Ceremonies • Events',
      title: "DJ'S SERVICES & BUSINESS",
      description: 'Professional DJ for Weddings, Ceremonies and Elite Events. Creating unforgettable experiences through sound.',
      contactDJ: 'Contact DJ',
    },
    about: {
      title: "About DJ'S SERVICES",
      p1: "DJ'S SERVICES & BUSINESS is a professional DJ service provider known for creating unforgettable experiences at weddings, ceremonies, and special events.",
      p2: "With professional sound equipment and excellent music selection, DJ EMMY & DJ PETER keep the dance floor alive and guests entertained throughout the night.",
      p3: "We believe every event is unique. Our mission is to blend your personal style with our professional expertise to create a seamless, high-energy atmosphere that resonates with every guest.",
      yearsExp: 'Years Experience',
      eventsCompleted: 'Events Completed',
    },
    services: {
      title: 'Our Elite Services',
      subtitle: 'Tailored entertainment solutions designed to elevate your event to the next level of luxury.',
      wedding: {
        title: 'Wedding DJ',
        desc: 'Elegant music curation for your special day, from the first dance to the final party anthem.',
      },
      ceremony: {
        title: 'Ceremony DJ',
        desc: 'Perfectly timed audio and background music for a flawless and emotional ceremony experience.',
      },
      birthday: {
        title: 'Birthday Parties',
        desc: 'High-energy sets tailored to your favorite genres to make your birthday celebration legendary.',
      },
      corporate: {
        title: 'Corporate Events',
        desc: 'Professional entertainment solutions for galas, product launches, and company celebrations.',
      },
      private: {
        title: 'Private Parties',
        desc: 'Exclusive DJ services for intimate gatherings, anniversaries, and luxury home events.',
      },
    },
    gallery: {
      title: 'Event Gallery',
      subtitle: "A glimpse into the unforgettable moments we've created.",
    },
    videos: {
      title: 'Event Highlights',
      subtitle: 'Experience the energy and atmosphere of our live performances.',
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Real stories from unforgettable events. We take pride in making every moment special.',
      items: [
        {
          name: "Sarah & James",
          event: "Wedding",
          text: "DJ Emmy and DJ Peter were incredible! They kept the energy high all night at our wedding. The transition between songs was seamless and the atmosphere was magical. Highly recommend!"
        },
        {
          name: "Mark T.",
          event: "Corporate Gala",
          text: "The best DJ service we've ever hired. The music selection was perfect for our corporate gala, balancing professional background music with high-energy dance sets later in the evening."
        },
        {
          name: "Elena R.",
          event: "Private Birthday Party",
          text: "Unforgettable birthday party thanks to DJ'S SERVICES. The sound quality was top-notch and they really knew how to read the crowd. Everyone was on the dance floor from start to finish!"
        }
      ]
    },
    location: {
      title: 'Our Headquarters',
      subtitle: 'Visit us at our main office in Rubavu. We are perfectly positioned to serve the entire Western Province and beyond.',
      office: 'Rubavu Office',
      address: 'Address',
      addressLine1: 'Rukoko Cell, Rubavu Sector',
      addressLine2: 'Rubavu District, Western Province',
      addressLine3: 'Near Umurage Garden',
      serviceArea: 'Service Area',
      serviceAreaDesc: 'Specializing in events across Rubavu, Gisenyi, and cross-border celebrations. Available for travel nationwide.',
      businessHours: 'Business Hours',
      monFri: 'Monday - Friday',
      sat: 'Saturday',
      sun: 'Sunday',
      eventBookings: 'Event Bookings Only',
      appointments: 'Appointments Recommended',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to make your event legendary? Contact us today to check availability and get a custom quote for your celebration.',
      phone: 'Phone & WhatsApp',
      phoneWhatsapp: 'Phone & WhatsApp',
      bookTitle: 'Book Your Date',
      name: 'Full Name',
      namePlaceholder: 'Your Name',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'Phone Number',
      date: 'Event Date',
      message: 'Message',
      messagePlaceholder: 'Tell us about your event...',
      sendWhatsapp: 'Send via WhatsApp',
      sendEmail: 'Send via Email',
      success: 'Message sent successfully!',
      successTitle: 'Booking Request Received!',
      successSubtitle: 'Thank you for choosing DJ\'S SERVICES. We have received your request and our team will review it shortly.',
      estimatedResponse: 'Estimated Response Time: Within 2-4 hours',
      bookingSummary: 'Booking Summary',
      backToForm: 'Send Another Message',
      bookingRequest: "Booking Request from DJ'S SERVICES Website",
      emailSubject: 'New Booking Request - DJ\'S SERVICES',
      errors: {
        nameRequired: 'Name is required',
        nameMin: 'Name must be at least 2 characters',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number',
        dateRequired: 'Event date is required',
        datePast: 'Event date cannot be in the past',
        messageRequired: 'Message is required',
        messageMin: 'Message must be at least 10 characters',
      }
    },
    footer: {
      rights: 'All rights reserved.',
      designedBy: 'Designed with excellence.',
    },
    ai: {
      assistant: 'AI Event Assistant',
      welcome: "Hello! I'm your AI assistant for DJ'S SERVICES & BUSINESS. How can I help you plan your perfect event today?",
      placeholder: 'Ask about our services...',
      error: "I'm having a little trouble connecting right now. Please feel free to call us directly!",
    }
  },
  rw: {
    nav: {
      home: 'Ahabanza',
      about: 'Turi ba nde',
      services: 'Serivisi',
      gallery: 'Amafoto',
      videos: 'Videwo',
      testimonials: 'Ubuhamya',
      location: 'Aho dukorera',
      contact: 'Twandikire',
      bookNow: 'Gura Serivisi',
    },
    hero: {
      aiPowered: 'Imyidagaduro ikoresha AI',
      subtitle: 'Ubukwe • Ibirori • Ibirori bidasanzwe',
      title: "DJ'S SERVICES & BUSINESS",
      description: 'DJ w’umwuga mu bukwe, ibirori n’ibirori by’indashyikirwa. Kurema ibihe bitazibagirana binyuze mu majwi.',
      contactDJ: 'Vugana na DJ',
    },
    about: {
      title: "Ibyerekeye DJ'S SERVICES",
      p1: "DJ'S SERVICES & BUSINESS ni serivisi ya DJ y’umwuga izwiho kurema ibihe bitazibagirana mu bukwe, ibirori n’ibirori bidasanzwe.",
      p2: "Dufite ibikoresho by’amajwi by’umwuga no guhitamo umuziki mwiza, DJ EMMY & DJ PETER batuma abantu babyina kandi bakidagadura ijoro ryose.",
      p3: "Twemera ko buri birori ari bidasanzwe. Inshingano yacu ni ukubangikanya uburyo bwawe bwite n’ubunararibonye bwacu bw’umwuga kugira ngo tureme ikirere cyiza kandi gifite imbaraga kinyura buri mushyitsi.",
      yearsExp: 'Imyaka y’ubunararibonye',
      eventsCompleted: 'Ibirori byakozwe',
    },
    services: {
      title: 'Serivisi zacu z’indashyikirwa',
      subtitle: 'Ibisubizo by’imyidagaduro byateguwe kugira ngo bizure ibirori byanyu ku rwego rwo hejuru rw’ubuhanga.',
      wedding: {
        title: 'DJ w’ubukwe',
        desc: 'Guhitamo umuziki mwiza ku munsi wawe udasanzwe, kuva ku mbyino ya mbere kugeza ku ndirimbo ya nyuma y’ibirori.',
      },
      ceremony: {
        title: 'DJ w’ibirori',
        desc: 'Amajwi n’umuziki byateguwe neza ku gihe kugira ngo ibirori bigende neza kandi bishimishije.',
      },
      birthday: {
        title: 'Ibirori by’amavuko',
        desc: 'Umuziki ufite imbaraga nyinshi uhujwe n’indirimbo ukunda kugira ngo ibirori byawe by’amavuko bibe amateka.',
      },
      corporate: {
        title: 'Ibirori by’ibigo',
        desc: 'Ibisubizo by’imyidagaduro by’umwuga mu birori by’ibigo, kumurika ibicuruzwa n’ibirori by’amasosiyete.',
      },
      private: {
        title: 'Ibirori byitekererejwe',
        desc: 'Serivisi za DJ zihariye mu birori by’abantu bake, isabukuru n’ibirori byo mu rugo by’akataraboneka.',
      },
    },
    gallery: {
      title: 'Amafoto y’ibirori',
      subtitle: 'Akajisho ku bihe bitazibagirana twaremye.',
    },
    videos: {
      title: 'Ibyaranze Ibirori',
      subtitle: 'Incamake y’uburyo ibirori byacu biba bimeze.',
    },
    testimonials: {
      title: 'Ibyo abakiriya bacu bavuga',
      subtitle: 'Inkuru z’ukuri zivuye mu birori bitazibagirana. Twishimira gutuma buri mwanya uba udasanzwe.',
      items: [
        {
          name: "Sarah & James",
          event: "Ubukwe",
          text: "DJ Emmy na DJ Peter bari batangaje! Batumye ibirori birushaho kuryoha ijoro ryose mu bukwe bwacu. Guhindura indirimbo byari bimeze neza cyane kandi ikirere cyari gishimishije. Turabashishikariza bose!"
        },
        {
          name: "Mark T.",
          event: "Ibirori by'ikigo",
          text: "Serivisi nziza ya DJ twigeze dukoresha. Guhitamo umuziki byari byiza cyane mu birori byacu, buringaniza umuziki utuje n'umuziki ubyinitse neza nyuma y'umunsi."
        },
        {
          name: "Elena R.",
          event: "Isabukuru y'amavuko",
          text: "Isabukuru y'amavuko itazibagirana tubikesha DJ'S SERVICES. Amajwi yari meza cyane kandi bazi neza uko bafata abantu. Buri wese yari ari kubyina kuva batangira kugeza basoje!"
        }
      ]
    },
    location: {
      title: 'Icyicaro cyacu',
      subtitle: 'Sura ibiro byacu bikuru i Rubavu. Turi mu mwanya mwiza wo gukorera mu Ntara y’Uburengerazuba n’ahandi.',
      office: 'Ibiro by’i Rubavu',
      address: 'Aho dukorera',
      addressLine1: 'Akagari ka Rukoko, Umurenge wa Rubavu',
      addressLine2: 'Akarere ka Rubavu, Intara y’Uburengerazuba',
      addressLine3: 'Hafi y’ubusitani bwa Umurage',
      serviceArea: 'Aho dukorera',
      serviceAreaDesc: 'Twibanda ku birori by’i Rubavu, Gisenyi, n’ibirori byambukiranya imipaka. Turaboneka mu gihugu hose.',
      businessHours: 'Amasaha y’akazi',
      monFri: 'Kuwa Mbere - Kuwa Gatanu',
      sat: 'Kuwa Gatandatu',
      sun: 'Ku cyumweru',
      eventBookings: 'Ibirori byateguwe gusa',
      appointments: 'Gufata gahunda birasabwa',
    },
    contact: {
      title: 'Twandikire',
      subtitle: 'Witeguye gutuma ibirori byawe biba amateka? Twandikire uyu munsi urebe niba dushobora kuboneka kandi uhabwe igiciro cyihariye.',
      phone: 'Telefone & WhatsApp',
      phoneWhatsapp: 'Telefone & WhatsApp',
      bookTitle: 'Fata itariki yawe',
      name: 'Amazina yose',
      namePlaceholder: 'Amazina yawe',
      phoneLabel: 'Nimero ya telefone',
      phonePlaceholder: 'Nimero ya telefone',
      date: 'Itariki y’ibirori',
      message: 'Ubutumwa',
      messagePlaceholder: 'Tubwire ibyerekeye ibirori byawe...',
      sendWhatsapp: 'Ohereza kuri WhatsApp',
      sendEmail: 'Ohereza kuri Email',
      success: 'Ubutumwa bwoherejwe neza!',
      successTitle: 'Gusaba Serivisi Kwakiriwe!',
      successSubtitle: 'Murakoze guhitamo DJ\'S SERVICES. Twakiriye ubusabe bwanyu kandi itsinda ryacu rirabusuzuma vuba.',
      estimatedResponse: 'Igihe cyo gusubizwa: Mu masaha 2 kugeza kuri 4',
      bookingSummary: 'Incamake y’ibyo wasabye',
      backToForm: 'Ohereza ubundi butumwa',
      bookingRequest: "Gusaba Serivisi bivuye ku rubuga rwa DJ'S SERVICES",
      emailSubject: 'Gusaba Serivisi nshya - DJ\'S SERVICES',
      errors: {
        nameRequired: 'Izina rirakenewe',
        nameMin: 'Izina rigomba kugira nibura inyuguti 2',
        phoneRequired: 'Nimero ya telefone irakenewe',
        phoneInvalid: 'Nyabuneka shyiramo nimero ya telefone yuzuye',
        dateRequired: 'Itariki y’ibirori irakenewe',
        datePast: 'Itariki y’ibirori ntishobora kuba mu bihe byashize',
        messageRequired: 'Ubutumwa burakenewe',
        messageMin: 'Ubutumwa bugomba kugira nibura inyuguti 10',
      }
    },
    footer: {
      rights: 'Uburenganzira bwose burasigasirwa.',
      designedBy: 'Byateguwe neza cyane.',
    },
    ai: {
      assistant: 'Umujyanama wa AI',
      welcome: "Muraho! Ndi umujyanama wawe wa AI wa DJ'S SERVICES & BUSINESS. Nagufasha nte gutegura ibirori byawe neza uyu munsi?",
      placeholder: 'Baza ibyerekeye serivisi zacu...',
      error: 'Mfite ikibazo cyo guhuza ubu. Nyabuneka hamagara kuri telefone mu buryo butaziguye!',
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      gallery: 'Galerie',
      videos: 'Vidéos',
      testimonials: 'Témoignages',
      location: 'Emplacement',
      contact: 'Contact',
      bookNow: 'Réserver',
    },
    hero: {
      aiPowered: 'Divertissement propulsé par l’IA',
      subtitle: 'Mariages • Cérémonies • Événements',
      title: "DJ'S SERVICES & BUSINESS",
      description: 'DJ professionnel pour mariages, cérémonies et événements d’élite. Créer des expériences inoubliables par le son.',
      contactDJ: 'Contacter le DJ',
    },
    about: {
      title: "À propos de DJ'S SERVICES",
      p1: "DJ'S SERVICES & BUSINESS est un fournisseur de services de DJ professionnel connu pour créer des expériences inoubliables lors de mariages, de cérémonies et d'événements spéciaux.",
      p2: "Avec un équipement sonore professionnel et une excellente sélection musicale, DJ EMMY & DJ PETER maintiennent la piste de danse animée et les invités divertis toute la nuit.",
      p3: "Nous pensons que chaque événement est unique. Notre mission est de mélanger votre style personnel avec notre expertise professionnelle pour créer une atmosphère fluide et énergique qui résonne avec chaque invité.",
      yearsExp: 'Années d’expérience',
      eventsCompleted: 'Événements réalisés',
    },
    services: {
      title: 'Nos services d’élite',
      subtitle: 'Des solutions de divertissement sur mesure conçues pour élever votre événement au prochain niveau de luxe.',
      wedding: {
        title: 'DJ de mariage',
        desc: 'Curation musicale élégante pour votre journée spéciale, de la première danse à l’hymne final de la fête.',
      },
      ceremony: {
        title: 'DJ de cérémonie',
        desc: 'Audio et musique de fond parfaitement synchronisés pour une expérience de cérémonie impeccable et émouvante.',
      },
      birthday: {
        title: 'Fêtes d’anniversaire',
        desc: 'Sets énergiques adaptés à vos genres préférés pour rendre votre célébration d’anniversaire légendaire.',
      },
      corporate: {
        title: 'Événements d’entreprise',
        desc: 'Solutions de divertissement professionnelles pour galas, lancements de produits et célébrations d’entreprise.',
      },
      private: {
        title: 'Fêtes privées',
        desc: 'Services de DJ exclusifs pour réunions intimes, anniversaires et événements de luxe à domicile.',
      },
    },
    gallery: {
      title: 'Galerie d’événements',
      subtitle: 'Un aperçu des moments inoubliables que nous avons créés.',
    },
    videos: {
      title: 'Points forts de l\'événement',
      subtitle: 'Découvrez l\'énergie et l\'atmosphère de nos performances en direct.',
    },
    testimonials: {
      title: 'Ce que disent nos clients',
      subtitle: 'Des histoires réelles d’événements inoubliables. Nous sommes fiers de rendre chaque moment spécial.',
      items: [
        {
          name: "Sarah & James",
          event: "Mariage",
          text: "DJ Emmy et DJ Peter étaient incroyables ! Ils ont gardé l'énergie élevée toute la nuit lors de notre mariage. La transition entre les chansons était fluide et l'atmosphère était magique. Je recommande vivement !"
        },
        {
          name: "Mark T.",
          event: "Gala d'entreprise",
          text: "Le meilleur service de DJ que nous ayons jamais engagé. La sélection musicale était parfaite pour notre gala d'entreprise, équilibrant la musique de fond professionnelle avec des sets de danse énergiques plus tard dans la soirée."
        },
        {
          name: "Elena R.",
          event: "Fête d'anniversaire privée",
          text: "Fête d'anniversaire inoubliable grâce à DJ'S SERVICES. La qualité sonore était de premier ordre et ils savaient vraiment comment lire la foule. Tout le monde était sur la piste de danse du début à la fin !"
        }
      ]
    },
    location: {
      title: 'Notre siège social',
      subtitle: 'Visitez-nous à notre bureau principal à Rubavu. Nous sommes parfaitement positionnés pour servir toute la province de l’Ouest et au-delà.',
      office: 'Bureau de Rubavu',
      address: 'Adresse',
      addressLine1: 'Cellule Rukoko, Secteur Rubavu',
      addressLine2: 'District de Rubavu, Province de l’Ouest',
      addressLine3: 'Près du jardin Umurage',
      serviceArea: 'Zone de service',
      serviceAreaDesc: 'Spécialisé dans les événements à travers Rubavu, Gisenyi et les célébrations transfrontalières. Disponible pour voyager dans tout le pays.',
      businessHours: 'Heures d’ouverture',
      monFri: 'Lundi - Vendredi',
      sat: 'Samedi',
      sun: 'Dimanche',
      eventBookings: 'Réservations d’événements uniquement',
      appointments: 'Rendez-vous recommandés',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Prêt à rendre votre événement légendaire ? Contactez-nous dès aujourd’hui pour vérifier la disponibilité et obtenir un devis personnalisé pour votre célébration.',
      phone: 'Téléphone & WhatsApp',
      phoneWhatsapp: 'Téléphone & WhatsApp',
      bookTitle: 'Réservez votre date',
      name: 'Nom complet',
      namePlaceholder: 'Votre nom',
      phoneLabel: 'Numéro de téléphone',
      phonePlaceholder: 'Numéro de téléphone',
      date: 'Date de l’événement',
      message: 'Message',
      messagePlaceholder: 'Parlez-nous de votre événement...',
      sendWhatsapp: 'Envoyer via WhatsApp',
      sendEmail: 'Envoyer par e-mail',
      success: 'Message envoyé avec succès !',
      successTitle: 'Demande de réservation reçue !',
      successSubtitle: 'Merci d\'avoir choisi DJ\'S SERVICES. Nous avons bien reçu votre demande et notre équipe l\'examinera sous peu.',
      estimatedResponse: 'Délai de réponse estimé : Dans les 2 à 4 heures',
      bookingSummary: 'Résumé de la réservation',
      backToForm: 'Envoyer un autre message',
      bookingRequest: "Demande de réservation depuis le site DJ'S SERVICES",
      emailSubject: 'Nouvelle demande de réservation - DJ\'S SERVICES',
      errors: {
        nameRequired: 'Le nom est requis',
        nameMin: 'Le nom doit comporter au moins 2 caractères',
        phoneRequired: 'Le numéro de téléphone est requis',
        phoneInvalid: 'Veuillez entrer un numéro de téléphone valide',
        dateRequired: 'La date de l’événement est requise',
        datePast: 'La date de l’événement ne peut pas être dans le passé',
        messageRequired: 'Le message est requis',
        messageMin: 'Le message doit comporter au moins 10 caractères',
      }
    },
    footer: {
      rights: 'Tous droits réservés.',
      designedBy: 'Conçu avec excellence.',
    },
    ai: {
      assistant: 'Assistant d’événement IA',
      welcome: "Bonjour ! Je suis votre assistant IA pour DJ'S SERVICES & BUSINESS. Comment puis-je vous aider à planifier votre événement parfait aujourd'hui ?",
      placeholder: 'Posez des questions sur nos services...',
      error: 'J’ai un peu de mal à me connecter en ce moment. N’hésitez pas à nous appeler directement !',
    }
  }
};
