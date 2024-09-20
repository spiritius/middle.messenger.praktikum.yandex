import { 
  CONTACTS, 
  CONTACT_DROPDOWN_OPTIONS,
  PROFILE_DROPDWON_OPTIONS,
  ATTACH_OPTIONS } from './const.ts';

interface Context {
  [key: string]: object;
}

const context: Context = {
  Registration: {},
  Login: {},
  Error404: {
    title: '404 Page not found',
    descr: 'You got the wrong way',
    link: 'Back to chats',
  },
  Error500: {
    title: '500 Server error',
    descr: 'We are already fixing it',
    link: 'Back to chats',
  },
  Profile: {},
  ProfileChange: {},
  PasswordChange: {},
  Chat: {
    contacts: CONTACTS,
    contactOptions: CONTACT_DROPDOWN_OPTIONS,
    options: PROFILE_DROPDWON_OPTIONS,
    attachOptions: ATTACH_OPTIONS,
    currentChatContact: {
      avatar: '/user-1.png',
      name: 'Andrew Ivanov'
    },
    messages: [
      {
        author: 'user',
        date: '10:55',
        content: 'Thanks! 😃'
      },
      {
        author: 'contact',
        date: '10:41',
        content: 'See you later))'
      },
      {
        author: 'contact',
        date: '10:40',
        content: 'Cool yeah?'
      },
      {
        author: 'contact',
        date: '10:35',
        content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi distinctio laborum doloremque cumque alias est nobis quae illo voluptatem iure ullam similique corrupti repellendus, praesentium eum soluta! Ex, consectetur tempore.'
      },
      {
        author: 'contact',
        date: '10:32',
        content: '<img src="/img-1.png" alt="Image">'
      },
      {
        author: 'contact',
        date: '10:30',
        content: 'A misty forest is a realm of enchantment and mystery. The fog drapes over the trees like a ghostly veil, muffling sounds and blurring the edges of reality. Every step taken on the soft, damp ground feels like a journey into the unknown, with shadows and shapes shifting in the haze. The air is cool and thick with the scent of earth and pine, creating an atmosphere both eerie and serene. In a misty forest, time seems to stand still, and one can’t help but feel that magic and secrets linger just beyond sight.<br><br>A misty forest is a place where magic feels tangible, suspended in the air along with the mist that clings to every branch and leaf. The world becomes a canvas of grays and greens, where sunlight barely penetrates the thick canopy, casting ethereal glows on the forest floor. Sounds are softened, footsteps hushed, and every rustle or distant call seems to echo with ancient stories. In the mist, the forest transforms into an enigmatic landscape, where the line between reality and fantasy blurs, inviting wanderers to lose themselves in its mystique.'
      },
    ]
  },
  ChatEmpty: {
    contacts: CONTACTS,
    contactOptions: CONTACT_DROPDOWN_OPTIONS,
    options: PROFILE_DROPDWON_OPTIONS,
    attachOptions: ATTACH_OPTIONS,
  }
};

export default context;
