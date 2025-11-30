// Bitcoin Education Lessons
// This file contains all Bitcoin education lessons organized by subject
// This is static content only - user progress is stored separately keyed by Nostr pubkey

import { LessonContent } from "./education";

export const getBitcoinLessons = (): LessonContent[] => {
  return [
    // ========== BITCOIN HISTORY (21 lessons) ==========
    {
      id: "history-1",
      subject: "history",
      title: "The Birth of Bitcoin",
      description: "Learn about Satoshi Nakamoto and the creation of Bitcoin",
      difficulty: "beginner",
      readingContent: `# The Birth of Bitcoin

In October 2008, during the height of the global financial crisis, a mysterious person or group using the name Satoshi Nakamoto published a white paper titled "Bitcoin: A Peer-to-Peer Electronic Cash System." This document would change the world of money forever.

Satoshi's vision was to create a digital currency that didn't rely on banks or governments. Instead, Bitcoin would use cryptography and a decentralized network of computers to verify transactions. No single person or organization would control it.

On January 3, 2009, Satoshi mined the first Bitcoin block, known as the "Genesis Block." Embedded in this block was a message: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks." This was a headline from The Times newspaper that day, and it showed Satoshi's motivation - creating an alternative to the failing banking system.

In the early days, Bitcoin had no real-world value. People would mine thousands of Bitcoins just for fun. The first known purchase with Bitcoin was in May 2010, when Laszlo Hanyecz bought two pizzas for 10,000 Bitcoins - worth millions today!

Satoshi Nakamoto disappeared in 2011, leaving Bitcoin in the hands of the community. To this day, no one knows who Satoshi really is, but their creation has grown into a global phenomenon worth trillions of dollars.`,
      questions: [
        {
          id: "h1-q1",
          type: "multiple-choice",
          question: "When was the Bitcoin white paper published?",
          options: ["October 2007", "October 2008", "October 2009", "October 2010"],
          correctAnswer: "October 2008",
        },
        {
          id: "h1-q2",
          type: "multiple-choice",
          question: "What was the name of the first Bitcoin block?",
          options: ["Genesis Block", "Block Zero", "Satoshi Block", "First Block"],
          correctAnswer: "Genesis Block",
        },
        {
          id: "h1-q3",
          type: "true-false",
          question: "Satoshi Nakamoto's real identity is known to the public.",
          correctAnswer: false,
        },
        {
          id: "h1-q4",
          type: "multiple-choice",
          question: "What was the first known purchase made with Bitcoin?",
          options: ["A car", "Two pizzas", "A computer", "A house"],
          correctAnswer: "Two pizzas",
        },
      ],
    },
    {
      id: "history-2",
      subject: "history",
      title: "Early Bitcoin Adoption",
      description: "How Bitcoin grew from zero to global phenomenon",
      difficulty: "beginner",
      readingContent: `# Early Bitcoin Adoption

In Bitcoin's first years (2009-2012), it was mostly used by tech enthusiasts, cypherpunks, and people interested in cryptography. The community was small but passionate.

Early adopters saw Bitcoin as an experiment in digital money. They would mine Bitcoin on their personal computers, trade it on forums, and use it to buy things from each other. The value was extremely volatile - Bitcoin could go from worth pennies to dollars and back in days.

The first Bitcoin exchange, Mt. Gox, launched in 2010. It made it easier for people to buy and sell Bitcoin, but it also introduced new risks. Mt. Gox would later collapse in 2014, losing hundreds of thousands of Bitcoins.

Silk Road, an online marketplace, became one of Bitcoin's first major use cases starting in 2011. While controversial, it showed that Bitcoin could actually be used for real transactions. However, this association also gave Bitcoin a reputation problem that it's still working to overcome.

By 2012, Bitcoin had reached $10 per coin. The community was growing, and more businesses started accepting it. The Bitcoin Foundation was created to help promote and standardize Bitcoin development.

These early years were crucial. They proved that a decentralized digital currency could work, even if it was rough around the edges. The early adopters took huge risks, but they also helped build the foundation for what Bitcoin would become.`,
      questions: [
        {
          id: "h2-q1",
          type: "multiple-choice",
          question: "What was the first major Bitcoin exchange?",
          options: ["Coinbase", "Binance", "Mt. Gox", "Kraken"],
          correctAnswer: "Mt. Gox",
        },
        {
          id: "h2-q2",
          type: "multiple-choice",
          question: "By 2012, Bitcoin had reached what price?",
          options: ["$1", "$10", "$100", "$1000"],
          correctAnswer: "$10",
        },
        {
          id: "h2-q3",
          type: "true-false",
          question: "Early Bitcoin adopters were mostly tech enthusiasts and cypherpunks.",
          correctAnswer: true,
        },
        {
          id: "h2-q4",
          type: "multiple-choice",
          question: "What organization was created in 2012 to promote Bitcoin?",
          options: ["Bitcoin Foundation", "Bitcoin Association", "Bitcoin Council", "Bitcoin Alliance"],
          correctAnswer: "Bitcoin Foundation",
        },
      ],
    },
    {
      id: "history-3",
      subject: "history",
      title: "The 2013 Boom and Bust",
      description: "Bitcoin's first major price cycle",
      difficulty: "intermediate",
      readingContent: `# The 2013 Boom and Bust

2013 was Bitcoin's breakout year. The price went from around $13 at the start of the year to over $1,000 by November - a 7,600% increase! This was Bitcoin's first major bull run, and it brought mainstream attention.

Several factors drove this growth. Cyprus had a banking crisis, and people there turned to Bitcoin as an alternative. Media coverage increased dramatically. More businesses started accepting Bitcoin. And perhaps most importantly, more people started to understand what Bitcoin actually was.

The price surge created a feedback loop. As Bitcoin's price went up, more people wanted to buy it. As more people bought it, the price went up further. This created a bubble.

In December 2013, China's central bank banned financial institutions from handling Bitcoin transactions. The price crashed from over $1,000 to around $600. This was Bitcoin's first major crash, and it taught the community an important lesson: Bitcoin's price is extremely volatile and can be affected by government actions.

The crash was painful for many investors, but it also showed Bitcoin's resilience. Despite the ban, Bitcoin didn't disappear. The network kept running, transactions continued, and the community kept building.

This cycle - boom, bust, recovery - would become a pattern for Bitcoin. Each cycle brought more users, more infrastructure, and more understanding. The 2013 cycle proved that Bitcoin could survive major setbacks and come back stronger.`,
      questions: [
        {
          id: "h3-q1",
          type: "multiple-choice",
          question: "What was Bitcoin's price at the start of 2013?",
          options: ["$1", "$13", "$100", "$1,000"],
          correctAnswer: "$13",
        },
        {
          id: "h3-q2",
          type: "multiple-choice",
          question: "What country's banking crisis helped drive Bitcoin adoption in 2013?",
          options: ["Greece", "Cyprus", "Spain", "Italy"],
          correctAnswer: "Cyprus",
        },
        {
          id: "h3-q3",
          type: "multiple-choice",
          question: "What action by China's central bank caused Bitcoin to crash in December 2013?",
          options: ["Banned Bitcoin mining", "Banned Bitcoin exchanges", "Banned financial institutions from handling Bitcoin", "Banned all Bitcoin transactions"],
          correctAnswer: "Banned financial institutions from handling Bitcoin",
        },
        {
          id: "h3-q4",
          type: "true-false",
          question: "The 2013 crash destroyed Bitcoin permanently.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "history-4",
      subject: "history",
      title: "The Scaling Debate",
      description: "How Bitcoin's community handled disagreements",
      difficulty: "intermediate",
      readingContent: `# The Scaling Debate

As Bitcoin grew, it faced a critical problem: the network could only handle about 7 transactions per second. This was fine when Bitcoin was small, but as adoption increased, transactions became slow and expensive.

The community split into different camps with different solutions. Some wanted to increase the block size (the amount of data in each block). Others wanted to move some transactions off the main blockchain using "second layer" solutions like the Lightning Network.

This debate raged from 2015 to 2017. It was intense, sometimes personal, and very public. The community had to learn how to make decisions in a decentralized system where no one person or group had authority.

In August 2017, a group that wanted bigger blocks created Bitcoin Cash by "forking" (splitting) the Bitcoin blockchain. This was controversial, but it showed that in a decentralized system, people can disagree and go their separate ways.

Bitcoin itself eventually adopted Segregated Witness (SegWit), which increased capacity without changing the block size. Later, the Lightning Network launched, allowing millions of transactions per second off-chain.

The scaling debate was messy, but it was also important. It showed that Bitcoin's decentralized governance model could work, even when people disagreed strongly. It also led to innovations that made Bitcoin better.`,
      questions: [
        {
          id: "h4-q1",
          type: "multiple-choice",
          question: "How many transactions per second could Bitcoin originally handle?",
          options: ["1", "7", "70", "700"],
          correctAnswer: "7",
        },
        {
          id: "h4-q2",
          type: "multiple-choice",
          question: "What is the name of the Bitcoin fork that increased block size?",
          options: ["Bitcoin Gold", "Bitcoin Cash", "Bitcoin SV", "Bitcoin Classic"],
          correctAnswer: "Bitcoin Cash",
        },
        {
          id: "h4-q3",
          type: "multiple-choice",
          question: "What solution allows millions of transactions per second off Bitcoin's main chain?",
          options: ["SegWit", "Lightning Network", "Sidechains", "State channels"],
          correctAnswer: "Lightning Network",
        },
        {
          id: "h4-q4",
          type: "true-false",
          question: "The scaling debate showed that Bitcoin's decentralized governance doesn't work.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "history-5",
      subject: "history",
      title: "The 2017 Bull Run",
      description: "Bitcoin goes mainstream",
      difficulty: "intermediate",
      readingContent: `# The 2017 Bull Run

2017 was Bitcoin's year in the spotlight. The price went from under $1,000 to nearly $20,000 - a 2,000% increase! This bull run brought Bitcoin to mainstream attention like never before.

Several factors drove this growth. Japan made Bitcoin legal tender. More institutional investors started buying. The ICO (Initial Coin Offering) craze brought new people into crypto. And media coverage reached a fever pitch.

Bitcoin became a household name. People who had never heard of it were suddenly asking about it. Late-night TV hosts made jokes about it. Your grandparents probably asked you about it at Thanksgiving dinner.

But with the hype came problems. Transaction fees reached $50 or more. Transactions could take hours or days to confirm. The network was struggling under the weight of its own success.

The bubble popped in early 2018. The price crashed from $20,000 to around $3,000 over the next year. Many people who bought at the top lost money. But the infrastructure built during this time - exchanges, wallets, services - remained and improved.

The 2017 bull run showed that Bitcoin could capture mainstream attention. It also showed the challenges of scaling and the reality of volatility. Most importantly, it brought millions of new people into the Bitcoin ecosystem, many of whom stayed and continued to learn and build.`,
      questions: [
        {
          id: "h5-q1",
          type: "multiple-choice",
          question: "What was Bitcoin's approximate peak price in 2017?",
          options: ["$5,000", "$10,000", "$20,000", "$50,000"],
          correctAnswer: "$20,000",
        },
        {
          id: "h5-q2",
          type: "multiple-choice",
          question: "Which country made Bitcoin legal tender in 2017?",
          options: ["USA", "Japan", "South Korea", "Singapore"],
          correctAnswer: "Japan",
        },
        {
          id: "h5-q3",
          type: "multiple-choice",
          question: "How high did Bitcoin transaction fees reach during the 2017 bull run?",
          options: ["$5", "$20", "$50", "$100"],
          correctAnswer: "$50",
        },
        {
          id: "h5-q4",
          type: "true-false",
          question: "The 2017 bull run brought Bitcoin to mainstream attention for the first time.",
          correctAnswer: true,
        },
      ],
    },
    {
      id: "history-6",
      subject: "history",
      title: "The 2020-2021 Cycle",
      description: "Institutional adoption and new highs",
      difficulty: "intermediate",
      readingContent: `# The 2020-2021 Cycle

The 2020-2021 cycle was different from previous ones. This time, big companies and institutions got involved. Tesla bought $1.5 billion worth of Bitcoin. MicroStrategy bought billions. PayPal started offering Bitcoin. Even countries like El Salvador made Bitcoin legal tender.

The COVID-19 pandemic played a role. Governments printed trillions of dollars to stimulate economies. Many people saw Bitcoin as a hedge against inflation - a way to protect their wealth when money was being devalued.

Bitcoin reached new all-time highs, eventually hitting nearly $70,000 in November 2021. The narrative shifted from "Bitcoin is for criminals" to "Bitcoin is digital gold" and "Bitcoin is a store of value."

But this cycle also saw increased regulation. China banned Bitcoin mining entirely. The US started talking about stricter rules. Environmental concerns about Bitcoin's energy use became a major topic.

The cycle ended with another crash in 2022, but the infrastructure built during this time was significant. More people than ever understood Bitcoin. More businesses accepted it. More countries were exploring it.

This cycle showed that Bitcoin had matured. It was no longer just for tech enthusiasts - it was becoming part of the global financial system.`,
      questions: [
        {
          id: "h6-q1",
          type: "multiple-choice",
          question: "Which company bought $1.5 billion worth of Bitcoin in 2021?",
          options: ["Apple", "Tesla", "Microsoft", "Amazon"],
          correctAnswer: "Tesla",
        },
        {
          id: "h6-q2",
          type: "multiple-choice",
          question: "Which country became the first to make Bitcoin legal tender?",
          options: ["Panama", "El Salvador", "Honduras", "Guatemala"],
          correctAnswer: "El Salvador",
        },
        {
          id: "h6-q3",
          type: "multiple-choice",
          question: "What was Bitcoin's approximate peak price in 2021?",
          options: ["$30,000", "$50,000", "$70,000", "$100,000"],
          correctAnswer: "$70,000",
        },
        {
          id: "h6-q4",
          type: "true-false",
          question: "The 2020-2021 cycle was characterized by institutional adoption.",
          correctAnswer: true,
        },
      ],
    },
    // Continuing with more history lessons (7-12) and then other subjects...
    // For brevity, I'll create a few more key lessons and then provide the structure
    {
      id: "history-7",
      subject: "history",
      title: "Bitcoin's Cultural Impact",
      description: "How Bitcoin changed culture and society",
      difficulty: "intermediate",
      readingContent: `# Bitcoin's Cultural Impact

Bitcoin has done more than create a new form of money - it has changed how people think about money, trust, and power. The idea that you can send value across the world without a bank or government has profound implications.

Bitcoin has inspired a whole movement. People call themselves "Bitcoiners" and share a common set of values: financial sovereignty, decentralization, and individual freedom. Bitcoin meetups happen in cities around the world. Conferences draw thousands of attendees.

The "orange pill" - a reference to taking the red pill in The Matrix, but for Bitcoin - has become a meme. It represents the moment someone truly understands Bitcoin and sees the world differently.

Bitcoin has also influenced art, music, and literature. Artists create Bitcoin-themed works. Musicians accept Bitcoin payments. Books and documentaries explore Bitcoin's story.

Perhaps most importantly, Bitcoin has given people in countries with unstable currencies or oppressive governments a way to protect their wealth and transact freely. This isn't just about making money - it's about freedom.`,
      questions: [
        {
          id: "h7-q1",
          type: "multiple-choice",
          question: "What does the 'orange pill' meme represent?",
          options: ["Taking Bitcoin", "Understanding Bitcoin", "Selling Bitcoin", "Mining Bitcoin"],
          correctAnswer: "Understanding Bitcoin",
        },
        {
          id: "h7-q2",
          type: "true-false",
          question: "Bitcoin has only impacted finance, not culture.",
          correctAnswer: false,
        },
        {
          id: "h7-q3",
          type: "multiple-choice",
          question: "What is a key value shared by Bitcoiners?",
          options: ["Centralization", "Financial sovereignty", "Government control", "Bank dependence"],
          correctAnswer: "Financial sovereignty",
        },
      ],
    },
    // Continue with remaining history lessons (8-12)
    {
      id: "history-8",
      subject: "history",
      title: "Regulation and Legal Challenges",
      description: "How governments have responded to Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Regulation and Legal Challenges

Bitcoin has faced regulatory challenges from the start. Governments around the world have struggled with how to classify and regulate it. Is it money? A commodity? Property? A security? Different countries have answered differently.

Some countries, like El Salvador, embraced Bitcoin and made it legal tender. Others, like China, banned it entirely. Most countries are somewhere in between - allowing Bitcoin but with restrictions.

The regulatory landscape is constantly changing. What's legal today might not be tomorrow. This uncertainty creates challenges for businesses and users, but it also shows that Bitcoin is hard to stop.

Key regulatory issues include: taxation (how to tax Bitcoin transactions), money transmission laws (who needs licenses), and anti-money laundering rules (how to prevent illegal use).

Despite the challenges, Bitcoin continues to grow. This shows that decentralized systems are resilient to government actions. You can't shut down Bitcoin by shutting down a company - there's no company to shut down.`,
      questions: [
        {
          id: "h8-q1",
          type: "multiple-choice",
          question: "Which country made Bitcoin legal tender?",
          options: ["United States", "El Salvador", "Japan", "Switzerland"],
          correctAnswer: "El Salvador",
        },
        {
          id: "h8-q2",
          type: "multiple-choice",
          question: "Which country banned Bitcoin entirely?",
          options: ["China", "United States", "Japan", "Germany"],
          correctAnswer: "China",
        },
        {
          id: "h8-q3",
          type: "true-false",
          question: "Bitcoin can be easily shut down by governments.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "history-9",
      subject: "history",
      title: "Bitcoin Halvings",
      description: "Understanding Bitcoin's supply schedule",
      difficulty: "intermediate",
      readingContent: `# Bitcoin Halvings

Bitcoin has a built-in supply schedule. Every 210,000 blocks (approximately every 4 years), the reward for mining a block is cut in half. This is called a "halving."

The first halving happened in 2012, reducing the block reward from 50 BTC to 25 BTC. The second was in 2016 (25 to 12.5 BTC), the third in 2020 (12.5 to 6.25 BTC), and the fourth in 2024 (6.25 to 3.125 BTC).

This creates a predictable supply schedule. There will only ever be 21 million Bitcoins. The last Bitcoin will be mined around the year 2140. After that, miners will only earn transaction fees, not block rewards.

Halvings are significant events. They reduce the rate at which new Bitcoins enter circulation, which can affect the price. Historically, Bitcoin's price has tended to increase in the months and years following a halving.

The halving mechanism is one of Bitcoin's most important features. It ensures that Bitcoin becomes scarcer over time, similar to how gold becomes harder to mine as reserves are depleted.`,
      questions: [
        {
          id: "h9-q1",
          type: "multiple-choice",
          question: "How often do Bitcoin halvings occur?",
          options: ["Every year", "Every 2 years", "Every 4 years", "Every 10 years"],
          correctAnswer: "Every 4 years",
        },
        {
          id: "h9-q2",
          type: "multiple-choice",
          question: "What was the original Bitcoin block reward?",
          options: ["10 BTC", "25 BTC", "50 BTC", "100 BTC"],
          correctAnswer: "50 BTC",
        },
        {
          id: "h9-q3",
          type: "multiple-choice",
          question: "What is the maximum number of Bitcoins that will ever exist?",
          options: ["10 million", "21 million", "50 million", "100 million"],
          correctAnswer: "21 million",
        },
      ],
    },
    {
      id: "history-10",
      subject: "history",
      title: "Major Hacks and Security Incidents",
      description: "Learning from Bitcoin's security challenges",
      difficulty: "intermediate",
      readingContent: `# Major Hacks and Security Incidents

Bitcoin's history includes several major security incidents. The most famous was the Mt. Gox hack in 2014, where 850,000 Bitcoins (worth billions today) were stolen or lost. Mt. Gox was handling 70% of all Bitcoin transactions at the time.

Other major incidents include the Bitfinex hack (120,000 BTC stolen in 2016), and various exchange hacks over the years. These incidents taught important lessons about security.

The key lesson: "Not your keys, not your coins." When you keep Bitcoin on an exchange, you're trusting that exchange with your money. If the exchange gets hacked or goes bankrupt, you could lose everything.

This is why self-custody became so important. Holding your own private keys means you control your Bitcoin. No one can take it from you unless they get your keys.

These incidents also led to better security practices: multi-signature wallets, cold storage, insurance, and regulatory requirements for exchanges. While painful, these events made Bitcoin safer overall.`,
      questions: [
        {
          id: "h10-q1",
          type: "multiple-choice",
          question: "Which exchange lost 850,000 Bitcoins in 2014?",
          options: ["Coinbase", "Mt. Gox", "Binance", "Kraken"],
          correctAnswer: "Mt. Gox",
        },
        {
          id: "h10-q2",
          type: "multiple-choice",
          question: "What is the key lesson from these security incidents?",
          options: ["Use only big exchanges", "Not your keys, not your coins", "Bitcoin is unsafe", "Always use hot wallets"],
          correctAnswer: "Not your keys, not your coins",
        },
        {
          id: "h10-q3",
          type: "true-false",
          question: "Keeping Bitcoin on an exchange is always safe.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "history-11",
      subject: "history",
      title: "Bitcoin's Future",
      description: "Where Bitcoin is heading",
      difficulty: "advanced",
      readingContent: `# Bitcoin's Future

Bitcoin's future is uncertain but exciting. Some see it becoming a global reserve currency, replacing gold as a store of value. Others see it as "digital gold" - a way to preserve wealth in an uncertain world.

Technological developments continue. The Lightning Network makes Bitcoin usable for everyday payments. Taproot upgrades improve privacy and efficiency. New applications are being built on Bitcoin.

Challenges remain. Scaling is still an issue for the main chain. Energy consumption concerns persist. Regulatory uncertainty continues. But Bitcoin has survived and thrived despite these challenges.

The network effect is powerful. More users, more infrastructure, more understanding - each cycle makes Bitcoin stronger. The more people who use it, the more valuable it becomes.

Bitcoin's future depends on adoption. If more people use it, it becomes more valuable. If more businesses accept it, it becomes more useful. If more countries recognize it, it becomes more legitimate.

One thing is certain: Bitcoin has changed the world of money forever. Whether it succeeds or fails, it has proven that decentralized digital money is possible.`,
      questions: [
        {
          id: "h11-q1",
          type: "multiple-choice",
          question: "What technology makes Bitcoin usable for everyday payments?",
          options: ["SegWit", "Lightning Network", "Sidechains", "State channels"],
          correctAnswer: "Lightning Network",
        },
        {
          id: "h11-q2",
          type: "true-false",
          question: "Bitcoin's future is completely certain.",
          correctAnswer: false,
        },
        {
          id: "h11-q3",
          type: "multiple-choice",
          question: "What makes Bitcoin more valuable as it grows?",
          options: ["Government support", "The network effect", "Lower prices", "More regulation"],
          correctAnswer: "The network effect",
        },
      ],
    },
    {
      id: "history-12",
      subject: "history",
      title: "Key Figures in Bitcoin History",
      description: "Important people who shaped Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Key Figures in Bitcoin History

While Satoshi Nakamoto created Bitcoin, many others have shaped its development. These include developers, entrepreneurs, and thought leaders who have contributed to Bitcoin's growth.

Adam Back is a British cryptographer who created Hashcash in 1997. Hashcash was a proof-of-work system designed to prevent email spam, but it became much more important when Satoshi Nakamoto cited it in the Bitcoin white paper. Hashcash's proof-of-work concept is the foundation of Bitcoin's mining system. Without Adam Back's work, Bitcoin might never have existed. He continues to work on Bitcoin development and is the CEO of Blockstream, a company focused on Bitcoin infrastructure.

Hal Finney was the first person to receive Bitcoin from Satoshi. He was also a cryptographer who helped test Bitcoin in its early days. Sadly, he passed away in 2014, but his contributions live on.

Gavin Andresen became Bitcoin's lead developer after Satoshi left. He worked on improving Bitcoin's code and making it more accessible.

Nick Szabo is often credited with creating the concept of "smart contracts" and "bit gold" - a precursor to Bitcoin. Some people think he might be Satoshi, though he denies it.

Andreas Antonopoulos became one of Bitcoin's most important educators, writing books and giving talks that helped millions understand Bitcoin.

These and many others have built on Satoshi's foundation. Bitcoin is truly a collaborative effort - no single person controls it, but many have contributed to making it what it is today.`,
      questions: [
        {
          id: "h12-q1",
          type: "multiple-choice",
          question: "Who created Hashcash, which Satoshi cited in the Bitcoin white paper?",
          options: ["Hal Finney", "Adam Back", "Nick Szabo", "Gavin Andresen"],
          correctAnswer: "Adam Back",
        },
        {
          id: "h12-q2",
          type: "multiple-choice",
          question: "What was Hashcash originally designed to prevent?",
          options: ["Email spam", "Double spending", "Hacking", "Identity theft"],
          correctAnswer: "Email spam",
        },
        {
          id: "h12-q3",
          type: "multiple-choice",
          question: "Who was the first person to receive Bitcoin from Satoshi?",
          options: ["Gavin Andresen", "Hal Finney", "Nick Szabo", "Andreas Antonopoulos"],
          correctAnswer: "Hal Finney",
        },
        {
          id: "h12-q4",
          type: "multiple-choice",
          question: "Who became Bitcoin's lead developer after Satoshi left?",
          options: ["Hal Finney", "Gavin Andresen", "Nick Szabo", "Andreas Antonopoulos"],
          correctAnswer: "Gavin Andresen",
        },
        {
          id: "h12-q5",
          type: "true-false",
          question: "Bitcoin was created and developed by a single person.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "history-13",
      subject: "history",
      title: "The Cypherpunk Movement",
      description: "The ideological foundation of Bitcoin",
      difficulty: "intermediate",
      readingContent: `# The Cypherpunk Movement

Before Bitcoin, there was the cypherpunk movement. Starting in the 1980s, cypherpunks were a group of activists, cryptographers, and technologists who believed in using cryptography to protect privacy and individual freedom.

The cypherpunk manifesto, written by Eric Hughes in 1993, stated: "Privacy is necessary for an open society in the electronic age." Cypherpunks believed that governments and corporations were using technology to control people, and that cryptography could be used to fight back.

Key figures included Tim May, who wrote "The Crypto Anarchist Manifesto," and David Chaum, who created digital cash systems in the 1980s. These early experiments in digital money laid the groundwork for Bitcoin.

The cypherpunk mailing list, started in 1992, was where many of these ideas were discussed. Satoshi Nakamoto was likely part of this community, as the Bitcoin white paper was posted to a cryptography mailing list that cypherpunks frequented.

Bitcoin embodies cypherpunk values: decentralization, privacy, and freedom from centralized control. It's the cypherpunk dream realized - a form of money that governments can't control or shut down.

The movement continues today, with Bitcoiners carrying forward the cypherpunk ethos of financial sovereignty and individual liberty.`,
      questions: [
        {
          id: "h13-q1",
          type: "multiple-choice",
          question: "What did cypherpunks believe cryptography could be used for?",
          options: ["Government control", "Protecting privacy and individual freedom", "Corporate surveillance", "Banking systems"],
          correctAnswer: "Protecting privacy and individual freedom",
        },
        {
          id: "h13-q2",
          type: "multiple-choice",
          question: "When was the cypherpunk manifesto written?",
          options: ["1983", "1993", "2003", "2013"],
          correctAnswer: "1993",
        },
        {
          id: "h13-q3",
          type: "true-false",
          question: "Bitcoin embodies cypherpunk values.",
          correctAnswer: true,
        },
        {
          id: "h13-q4",
          type: "multiple-choice",
          question: "What was the cypherpunk mailing list?",
          options: ["A government list", "A place where cypherpunk ideas were discussed", "A Bitcoin exchange", "A mining pool"],
          correctAnswer: "A place where cypherpunk ideas were discussed",
        },
      ],
    },
    {
      id: "history-14",
      subject: "history",
      title: "The Bitcoin Whitepaper",
      description: "Understanding Satoshi's original vision",
      difficulty: "intermediate",
      readingContent: `# The Bitcoin Whitepaper

On October 31, 2008, Satoshi Nakamoto published "Bitcoin: A Peer-to-Peer Electronic Cash System" to a cryptography mailing list. This 9-page document would change the world.

The whitepaper solved a problem that had stumped cryptographers for decades: how to create digital cash that couldn't be double-spent without a central authority. Previous attempts required a trusted third party, which defeated the purpose of decentralization.

Satoshi's solution was elegant: a timestamp server that creates a chain of proof-of-work. Each block contains a hash of the previous block, creating an unbreakable chain. To change a transaction, you'd have to redo all the work that came after it - computationally impossible.

The whitepaper introduced key concepts: transactions, timestamps, proof-of-work, the network, incentives for miners, and privacy considerations. It was technical but accessible, showing that Satoshi understood both cryptography and economics.

The whitepaper didn't just describe a technology - it described a new form of money. It proposed a system where trust was mathematical, not institutional. Where value could be transferred peer-to-peer without banks.

Today, the whitepaper is studied by millions. It's been translated into dozens of languages. It remains the definitive guide to understanding Bitcoin's design and philosophy.`,
      questions: [
        {
          id: "h14-q1",
          type: "multiple-choice",
          question: "When was the Bitcoin whitepaper published?",
          options: ["October 31, 2007", "October 31, 2008", "October 31, 2009", "October 31, 2010"],
          correctAnswer: "October 31, 2008",
        },
        {
          id: "h14-q2",
          type: "multiple-choice",
          question: "What problem did the Bitcoin whitepaper solve?",
          options: ["How to mine Bitcoin", "How to create digital cash without double-spending", "How to buy Bitcoin", "How to store Bitcoin"],
          correctAnswer: "How to create digital cash without double-spending",
        },
        {
          id: "h14-q3",
          type: "true-false",
          question: "The Bitcoin whitepaper is only 3 pages long.",
          correctAnswer: false,
        },
        {
          id: "h14-q4",
          type: "multiple-choice",
          question: "What did Satoshi's solution use to prevent double-spending?",
          options: ["A central bank", "A timestamp server with proof-of-work", "Government regulation", "Exchange controls"],
          correctAnswer: "A timestamp server with proof-of-work",
        },
      ],
    },
    {
      id: "history-15",
      subject: "history",
      title: "Early Mining and Miners",
      description: "How Bitcoin mining evolved from hobby to industry",
      difficulty: "intermediate",
      readingContent: `# Early Mining and Miners

In Bitcoin's early days, anyone could mine Bitcoin on their personal computer. The difficulty was low, and early miners could earn thousands of Bitcoins just by running software on their laptop.

Satoshi mined the first blocks using a regular computer. Early adopters like Hal Finney mined Bitcoin casually, not realizing how valuable it would become. Some people mined Bitcoin just to support the network, not expecting it to be worth anything.

As Bitcoin gained value, mining became more competitive. People started using graphics cards (GPUs) because they were better at the mathematical calculations needed for mining. This was the first "arms race" in Bitcoin mining.

Then came Application-Specific Integrated Circuits (ASICs) - chips designed specifically for Bitcoin mining. These were far more efficient than GPUs, but also expensive. Mining moved from hobbyists' basements to large warehouses filled with specialized equipment.

Mining pools emerged, allowing individual miners to combine their computing power and share rewards. This made mining more accessible but also more centralized, as a few large pools came to control significant portions of the network's hash rate.

Today, mining is a multi-billion dollar industry. Large mining operations use massive amounts of electricity and require significant capital investment. But the principles remain the same: miners secure the network and are rewarded with new Bitcoins.`,
      questions: [
        {
          id: "h15-q1",
          type: "multiple-choice",
          question: "What could early Bitcoin miners use to mine?",
          options: ["Only ASICs", "Only GPUs", "Personal computers", "Smartphones"],
          correctAnswer: "Personal computers",
        },
        {
          id: "h15-q2",
          type: "multiple-choice",
          question: "What are ASICs?",
          options: ["Graphics cards", "Chips designed specifically for Bitcoin mining", "Regular computers", "Mobile phones"],
          correctAnswer: "Chips designed specifically for Bitcoin mining",
        },
        {
          id: "h15-q3",
          type: "true-false",
          question: "Mining pools allow individual miners to combine their computing power.",
          correctAnswer: true,
        },
        {
          id: "h15-q4",
          type: "multiple-choice",
          question: "What happened to mining as Bitcoin gained value?",
          options: ["It became easier", "It became more competitive", "It stopped", "It became free"],
          correctAnswer: "It became more competitive",
        },
      ],
    },
    {
      id: "history-16",
      subject: "history",
      title: "Bitcoin Forks and Alternative Coins",
      description: "How Bitcoin's codebase spawned other cryptocurrencies",
      difficulty: "intermediate",
      readingContent: `# Bitcoin Forks and Alternative Coins

Bitcoin's open-source code has been copied and modified to create thousands of other cryptocurrencies. Some are legitimate attempts to improve Bitcoin, while others are scams or experiments.

A "fork" happens when the blockchain splits into two separate chains. This can happen accidentally (a bug) or intentionally (a disagreement). The most famous intentional fork was Bitcoin Cash in 2017, which increased the block size to allow more transactions.

Bitcoin Cash was controversial. Supporters said it would make Bitcoin more usable for payments. Opponents said it would centralize mining and break Bitcoin's security model. The fork created two separate currencies, and holders of Bitcoin received equal amounts of Bitcoin Cash.

Other major forks include Bitcoin SV (which split from Bitcoin Cash), Bitcoin Gold, and Bitcoin Diamond. Each had different goals, but none have matched Bitcoin's value or adoption.

Beyond forks, thousands of "altcoins" (alternative coins) were created from scratch, using Bitcoin's ideas but with different features. Ethereum, for example, added smart contracts. Litecoin changed the mining algorithm. Each tried to solve problems Bitcoin couldn't or wouldn't.

The proliferation of altcoins created a whole new market - the cryptocurrency market. But Bitcoin remains the dominant force, with more value, more users, and more security than all others combined.`,
      questions: [
        {
          id: "h16-q1",
          type: "multiple-choice",
          question: "What is a Bitcoin fork?",
          options: ["A new exchange", "When the blockchain splits into two chains", "A new wallet", "A mining pool"],
          correctAnswer: "When the blockchain splits into two chains",
        },
        {
          id: "h16-q2",
          type: "multiple-choice",
          question: "What was Bitcoin Cash's main change?",
          options: ["Different mining algorithm", "Increased block size", "Added smart contracts", "Changed the supply"],
          correctAnswer: "Increased block size",
        },
        {
          id: "h16-q3",
          type: "true-false",
          question: "All Bitcoin forks have been successful.",
          correctAnswer: false,
        },
        {
          id: "h16-q4",
          type: "multiple-choice",
          question: "What are altcoins?",
          options: ["Bitcoin forks", "Alternative cryptocurrencies created from Bitcoin's ideas", "Bitcoin mining pools", "Bitcoin exchanges"],
          correctAnswer: "Alternative cryptocurrencies created from Bitcoin's ideas",
        },
      ],
    },
    {
      id: "history-17",
      subject: "history",
      title: "Bitcoin in Developing Countries",
      description: "How Bitcoin is transforming economies",
      difficulty: "intermediate",
      readingContent: `# Bitcoin in Developing Countries

While Bitcoin is often discussed in terms of investment or technology, its most profound impact may be in developing countries where traditional banking is inadequate or corrupt.

In countries with hyperinflation, like Venezuela or Zimbabwe, Bitcoin offers a way to preserve wealth when local currency is losing value daily. People can convert their earnings to Bitcoin and protect their savings from government money printing.

In countries with unstable banking systems, Bitcoin provides a reliable way to store and transfer value. You don't need a bank account, credit history, or government ID. You just need a smartphone and internet access.

Remittances are a major use case. Workers sending money home to their families often pay 10-20% in fees to services like Western Union. Bitcoin and the Lightning Network can reduce these fees to almost nothing, putting more money in the hands of families who need it most.

Countries like El Salvador and the Central African Republic have made Bitcoin legal tender, hoping it will attract investment and provide financial services to unbanked populations. The results are mixed, but the experiment continues.

Bitcoin also enables people in authoritarian countries to access the global economy. When governments control banks and restrict financial freedom, Bitcoin provides an alternative that can't be shut down.`,
      questions: [
        {
          id: "h17-q1",
          type: "multiple-choice",
          question: "What problem does Bitcoin solve in countries with hyperinflation?",
          options: ["High fees", "Preserving wealth when currency loses value", "Slow transactions", "Complex technology"],
          correctAnswer: "Preserving wealth when currency loses value",
        },
        {
          id: "h17-q2",
          type: "multiple-choice",
          question: "What is a major use case for Bitcoin in developing countries?",
          options: ["Trading", "Remittances", "Mining", "Gambling"],
          correctAnswer: "Remittances",
        },
        {
          id: "h17-q3",
          type: "true-false",
          question: "Bitcoin requires a bank account to use.",
          correctAnswer: false,
        },
        {
          id: "h17-q4",
          type: "multiple-choice",
          question: "Which country was the first to make Bitcoin legal tender?",
          options: ["Venezuela", "El Salvador", "Zimbabwe", "Nigeria"],
          correctAnswer: "El Salvador",
        },
      ],
    },
    {
      id: "history-18",
      subject: "history",
      title: "Bitcoin and Privacy",
      description: "The evolution of Bitcoin's privacy features",
      difficulty: "advanced",
      readingContent: `# Bitcoin and Privacy

Bitcoin is often called "pseudonymous" rather than anonymous. Every transaction is recorded on a public blockchain, visible to everyone. While addresses don't directly reveal your identity, sophisticated analysis can link addresses to real people.

This privacy model has evolved over time. Early Bitcoin users often reused addresses, making it easier to track their activity. As people learned about privacy, best practices emerged: use new addresses for each transaction, don't link addresses to your identity, and use privacy-focused wallets.

Several technologies have been developed to improve Bitcoin privacy. CoinJoin allows multiple users to combine their transactions, making it harder to determine who sent what to whom. Services like Wasabi Wallet and Samourai Wallet implement CoinJoin to enhance privacy.

Taproot, a 2021 upgrade, improved privacy by making all transactions look the same on the blockchain, whether they're simple payments or complex smart contracts. This makes it harder for observers to distinguish transaction types.

The Lightning Network also enhances privacy. Since transactions happen off-chain, they're not recorded on the public blockchain. Only the opening and closing of channels are visible.

Privacy is important for many reasons: protection from thieves, avoiding government surveillance, and maintaining financial autonomy. As Bitcoin adoption grows, privacy features become increasingly important.`,
      questions: [
        {
          id: "h18-q1",
          type: "multiple-choice",
          question: "What is Bitcoin often called instead of anonymous?",
          options: ["Transparent", "Pseudonymous", "Public", "Private"],
          correctAnswer: "Pseudonymous",
        },
        {
          id: "h18-q2",
          type: "multiple-choice",
          question: "What is CoinJoin?",
          options: ["A mining pool", "A way to combine transactions for privacy", "An exchange", "A wallet"],
          correctAnswer: "A way to combine transactions for privacy",
        },
        {
          id: "h18-q3",
          type: "true-false",
          question: "All Bitcoin transactions are completely private.",
          correctAnswer: false,
        },
        {
          id: "h18-q4",
          type: "multiple-choice",
          question: "What upgrade improved Bitcoin privacy by making transactions look the same?",
          options: ["SegWit", "Taproot", "Lightning", "CoinJoin"],
          correctAnswer: "Taproot",
        },
      ],
    },
    {
      id: "history-19",
      subject: "history",
      title: "Bitcoin's Energy Debate",
      description: "Understanding the environmental concerns and responses",
      difficulty: "intermediate",
      readingContent: `# Bitcoin's Energy Debate

Bitcoin mining uses a lot of electricity. Critics argue this is wasteful and harmful to the environment. Supporters argue that Bitcoin's energy use is justified and that the network is becoming more efficient.

The debate intensified in 2021 when Elon Musk announced Tesla would stop accepting Bitcoin due to environmental concerns. This sparked a global conversation about Bitcoin's carbon footprint.

Bitcoin's energy use comes from proof-of-work mining. Miners compete to solve mathematical puzzles, and this requires powerful computers running 24/7. As Bitcoin's price rises, more miners join the network, increasing energy consumption.

However, the narrative is more complex. Many miners use renewable energy, especially hydroelectric power. In some cases, Bitcoin mining uses excess energy that would otherwise be wasted, such as flared natural gas from oil wells.

Bitcoin supporters also argue that traditional banking uses far more energy when you consider all the buildings, ATMs, and infrastructure. They point out that Bitcoin provides a valuable service - secure, decentralized money - that justifies its energy use.

The debate continues, with some countries banning Bitcoin mining due to energy concerns, while others embrace it as a way to monetize renewable energy. The truth likely lies somewhere in between: Bitcoin uses significant energy, but the context matters.`,
      questions: [
        {
          id: "h19-q1",
          type: "multiple-choice",
          question: "What is the main source of Bitcoin's energy use?",
          options: ["Lightning Network", "Proof-of-work mining", "Exchanges", "Wallets"],
          correctAnswer: "Proof-of-work mining",
        },
        {
          id: "h19-q2",
          type: "multiple-choice",
          question: "What type of energy do many Bitcoin miners use?",
          options: ["Coal only", "Renewable energy", "Nuclear only", "Gas only"],
          correctAnswer: "Renewable energy",
        },
        {
          id: "h19-q3",
          type: "true-false",
          question: "All Bitcoin mining is harmful to the environment.",
          correctAnswer: false,
        },
        {
          id: "h19-q4",
          type: "multiple-choice",
          question: "What company stopped accepting Bitcoin due to environmental concerns?",
          options: ["Apple", "Tesla", "Microsoft", "Amazon"],
          correctAnswer: "Tesla",
        },
      ],
    },
    {
      id: "history-20",
      subject: "history",
      title: "Bitcoin ETFs and Institutional Products",
      description: "How Wall Street embraced Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Bitcoin ETFs and Institutional Products

For years, traditional investors wanted a way to invest in Bitcoin without actually holding it. They wanted Bitcoin exposure through familiar financial products like exchange-traded funds (ETFs).

The first Bitcoin futures ETF was approved in the United States in 2021. This allowed investors to buy shares in a fund that tracked Bitcoin's price, without needing to understand wallets, keys, or exchanges.

In 2024, spot Bitcoin ETFs were finally approved. These ETFs actually hold Bitcoin, not just futures contracts. This was a major milestone, as it gave institutional investors a regulated way to invest in Bitcoin.

The approval of Bitcoin ETFs brought massive inflows of capital. Billions of dollars flowed into Bitcoin through these products, driving up the price and legitimizing Bitcoin in the eyes of traditional finance.

Other institutional products followed: Bitcoin trusts, Bitcoin funds, and Bitcoin-backed securities. Each made Bitcoin more accessible to different types of investors.

This institutional adoption had mixed effects. On one hand, it brought legitimacy and capital. On the other hand, it increased centralization, as large institutions held Bitcoin in custody rather than individuals holding their own keys.

The debate continues: Is institutional adoption good for Bitcoin, or does it undermine Bitcoin's decentralized nature?`,
      questions: [
        {
          id: "h20-q1",
          type: "multiple-choice",
          question: "What is a Bitcoin ETF?",
          options: ["A Bitcoin exchange", "A fund that tracks Bitcoin's price", "A Bitcoin wallet", "A mining pool"],
          correctAnswer: "A fund that tracks Bitcoin's price",
        },
        {
          id: "h20-q2",
          type: "multiple-choice",
          question: "When were spot Bitcoin ETFs approved in the US?",
          options: ["2021", "2022", "2023", "2024"],
          correctAnswer: "2024",
        },
        {
          id: "h20-q3",
          type: "true-false",
          question: "Bitcoin ETFs allow investors to buy Bitcoin without holding it directly.",
          correctAnswer: true,
        },
        {
          id: "h20-q4",
          type: "multiple-choice",
          question: "What is a concern about institutional Bitcoin adoption?",
          options: ["It's too decentralized", "It increases centralization", "It's too private", "It's too fast"],
          correctAnswer: "It increases centralization",
        },
      ],
    },
    {
      id: "history-21",
      subject: "history",
      title: "The Lightning Network Revolution",
      description: "How Bitcoin became usable for everyday payments",
      difficulty: "advanced",
      readingContent: `# The Lightning Network Revolution

Bitcoin's main blockchain can only handle about 7 transactions per second. This makes it slow and expensive for small, everyday payments. The Lightning Network was created to solve this problem.

Lightning is a "layer 2" solution - it runs on top of Bitcoin's main blockchain. Users open payment channels by locking Bitcoin on the main chain. Then they can make unlimited instant, nearly-free transactions through these channels.

The idea was proposed in 2015 by Joseph Poon and Thaddeus Dryja. The first Lightning implementation launched in 2018. Since then, it has grown into a network with thousands of nodes and millions of dollars in capacity.

Lightning makes Bitcoin usable for coffee purchases, tips, and microtransactions. Transactions are instant and cost fractions of a cent. This is a game-changer for Bitcoin's use as actual money, not just a store of value.

Countries like El Salvador use Lightning for everyday Bitcoin payments. Apps like Strike and Cash App integrate Lightning, making it accessible to millions of users. The network continues to grow, with new features and improvements constantly being developed.

Lightning represents a new phase in Bitcoin's evolution - from digital gold to digital cash. It proves that Bitcoin can scale without changing its core protocol, maintaining decentralization while becoming more useful.`,
      questions: [
        {
          id: "h21-q1",
          type: "multiple-choice",
          question: "What is the Lightning Network?",
          options: ["A Bitcoin exchange", "A layer 2 solution for Bitcoin payments", "A mining pool", "A Bitcoin wallet"],
          correctAnswer: "A layer 2 solution for Bitcoin payments",
        },
        {
          id: "h21-q2",
          type: "multiple-choice",
          question: "When was the Lightning Network first proposed?",
          options: ["2013", "2015", "2017", "2019"],
          correctAnswer: "2015",
        },
        {
          id: "h21-q3",
          type: "true-false",
          question: "Lightning Network transactions are instant and nearly free.",
          correctAnswer: true,
        },
        {
          id: "h21-q4",
          type: "multiple-choice",
          question: "What does Lightning Network make Bitcoin usable for?",
          options: ["Only large transactions", "Everyday payments and microtransactions", "Only mining", "Only trading"],
          correctAnswer: "Everyday payments and microtransactions",
        },
      ],
    },
    // ========== SELF CUSTODY (21 lessons) ==========
    {
      id: "self-custody-1",
      subject: "self-custody",
      title: "What is Self Custody?",
      description: "Understanding the importance of controlling your own keys",
      difficulty: "beginner",
      readingContent: `# What is Self Custody?

Self custody means you control your own Bitcoin. You hold the private keys that give you access to your funds. No bank, exchange, or company has control over your Bitcoin.

When you keep Bitcoin on an exchange like Coinbase or Binance, you're using "custodial" storage. The exchange holds your keys. You trust them to keep your Bitcoin safe and give it back when you ask.

With self custody, you hold your own keys. You're responsible for keeping them safe, but you also have full control. No one can freeze your account, take your Bitcoin, or prevent you from using it.

The phrase "Not your keys, not your coins" is fundamental to Bitcoin. If you don't control the keys, you don't really own the Bitcoin - you just have a promise from someone else that they'll give it to you.

Self custody is about financial sovereignty - the freedom to control your own money without relying on third parties. It's one of Bitcoin's most important features.`,
      questions: [
        {
          id: "sc1-q1",
          type: "multiple-choice",
          question: "What does self custody mean?",
          options: ["Letting an exchange hold your Bitcoin", "Controlling your own private keys", "Using a bank", "Trusting a company"],
          correctAnswer: "Controlling your own private keys",
        },
        {
          id: "sc1-q2",
          type: "true-false",
          question: "When you keep Bitcoin on an exchange, you have full control over it.",
          correctAnswer: false,
        },
        {
          id: "sc1-q3",
          type: "multiple-choice",
          question: "What is the phrase that summarizes self custody?",
          options: ["Trust but verify", "Not your keys, not your coins", "Buy the dip", "HODL"],
          correctAnswer: "Not your keys, not your coins",
        },
      ],
    },
    {
      id: "self-custody-2",
      subject: "self-custody",
      title: "Private Keys and Seed Phrases",
      description: "Understanding the foundation of Bitcoin security",
      difficulty: "beginner",
      readingContent: `# Private Keys and Seed Phrases

Your private key is what gives you access to your Bitcoin. It's like a password, but much more powerful. If someone gets your private key, they can steal all your Bitcoin. If you lose it, you lose access forever.

Private keys are long strings of numbers and letters. They're hard to remember, which is why seed phrases were created. A seed phrase (also called a mnemonic phrase or recovery phrase) is a list of 12 or 24 words that represents your private key.

These words come from a standardized list of 2048 words. Your wallet software converts these words into a private key using a mathematical process.

The seed phrase is the most important thing to protect. Anyone who has it can access your Bitcoin. You should never share it with anyone, never store it online, and never take a photo of it.

Write it down on paper and store it somewhere safe. Some people use metal backups that can survive fire or water damage. The key is: if you lose your seed phrase, you lose your Bitcoin forever.`,
      questions: [
        {
          id: "sc2-q1",
          type: "multiple-choice",
          question: "How many words are typically in a seed phrase?",
          options: ["6 or 12", "12 or 24", "24 or 48", "48 or 96"],
          correctAnswer: "12 or 24",
        },
        {
          id: "sc2-q2",
          type: "true-false",
          question: "You should share your seed phrase with trusted friends.",
          correctAnswer: false,
        },
        {
          id: "sc2-q3",
          type: "multiple-choice",
          question: "What happens if you lose your seed phrase?",
          options: ["You can recover it", "You lose your Bitcoin forever", "The exchange will help", "You can create a new one"],
          correctAnswer: "You lose your Bitcoin forever",
        },
      ],
    },
    {
      id: "self-custody-3",
      subject: "self-custody",
      title: "Types of Wallets",
      description: "Hot wallets, cold wallets, and hardware wallets",
      difficulty: "beginner",
      readingContent: `# Types of Wallets

Bitcoin wallets come in different forms. Understanding the differences helps you choose the right one for your needs.

Hot wallets are connected to the internet. They're convenient for everyday use but less secure. Examples include mobile apps and desktop software. They're good for small amounts you use regularly.

Cold wallets are offline. They're more secure but less convenient. Hardware wallets (like Ledger or Trezor) are physical devices that store your keys offline. They're considered the gold standard for security.

Paper wallets are printed copies of your keys. They're completely offline but can be lost or damaged. They're not recommended for beginners.

Custodial wallets are provided by exchanges or companies. They hold your keys for you. They're easy to use but you don't have full control.

The best practice: use a hardware wallet for large amounts (cold storage) and a hot wallet for small amounts you use daily. This is called the "hot/cold" strategy.`,
      questions: [
        {
          id: "sc3-q1",
          type: "multiple-choice",
          question: "What is a hot wallet?",
          options: ["A wallet that's always warm", "A wallet connected to the internet", "A hardware wallet", "A paper wallet"],
          correctAnswer: "A wallet connected to the internet",
        },
        {
          id: "sc3-q2",
          type: "multiple-choice",
          question: "What is considered the gold standard for security?",
          options: ["Hot wallets", "Hardware wallets", "Paper wallets", "Custodial wallets"],
          correctAnswer: "Hardware wallets",
        },
        {
          id: "sc3-q3",
          type: "true-false",
          question: "Hot wallets are more secure than cold wallets.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "self-custody-4",
      subject: "self-custody",
      title: "Backing Up Your Wallet",
      description: "How to safely backup your seed phrase",
      difficulty: "beginner",
      readingContent: `# Backing Up Your Wallet

Backing up your wallet is critical. If your device breaks, gets lost, or is stolen, your backup is the only way to recover your Bitcoin.

The most important backup is your seed phrase. Write it down on paper and store it somewhere safe. Never store it digitally (no photos, no cloud storage, no text files).

Consider making multiple copies and storing them in different secure locations. A fireproof safe is ideal. Some people use bank safety deposit boxes.

Test your backup! After writing it down, restore your wallet on a different device using just the seed phrase. If it works, you know your backup is good.

Metal backups are popular for long-term storage. They can survive fire and water damage. Companies make steel plates where you can stamp or engrave your seed phrase.

Remember: anyone who finds your seed phrase can steal your Bitcoin. Keep it as secure as you would keep cash or jewelry.`,
      questions: [
        {
          id: "sc4-q1",
          type: "multiple-choice",
          question: "What is the most important thing to backup?",
          options: ["Your wallet app", "Your seed phrase", "Your device", "Your password"],
          correctAnswer: "Your seed phrase",
        },
        {
          id: "sc4-q2",
          type: "true-false",
          question: "It's safe to store your seed phrase in a photo on your phone.",
          correctAnswer: false,
        },
        {
          id: "sc4-q3",
          type: "multiple-choice",
          question: "What should you do after backing up your seed phrase?",
          options: ["Share it with friends", "Store it online", "Test it by restoring on another device", "Forget about it"],
          correctAnswer: "Test it by restoring on another device",
        },
      ],
    },
    {
      id: "self-custody-5",
      subject: "self-custody",
      title: "Multi-Signature Wallets",
      description: "Using multiple keys for extra security",
      difficulty: "intermediate",
      readingContent: `# Multi-Signature Wallets

Multi-signature (multisig) wallets require multiple private keys to authorize a transaction. For example, a 2-of-3 multisig requires 2 out of 3 keys to sign.

This adds security because an attacker would need to steal multiple keys. It also allows for key management strategies - you could keep one key on your phone, one on a hardware wallet, and one with a trusted friend.

Multisig is especially useful for businesses or families. A family could set up a 2-of-3 wallet where any two family members can spend, but one person alone cannot.

The trade-off is complexity. Multisig wallets are more complicated to set up and use. They're also more expensive for transactions (more signatures = higher fees).

For most individuals, a single-signature wallet with a hardware device is sufficient. Multisig is for advanced users or specific use cases where extra security is worth the complexity.`,
      questions: [
        {
          id: "sc5-q1",
          type: "multiple-choice",
          question: "What does a 2-of-3 multisig wallet require?",
          options: ["2 out of 3 keys", "All 3 keys", "1 key", "No keys"],
          correctAnswer: "2 out of 3 keys",
        },
        {
          id: "sc5-q2",
          type: "true-false",
          question: "Multisig wallets are simpler than single-signature wallets.",
          correctAnswer: false,
        },
        {
          id: "sc5-q3",
          type: "multiple-choice",
          question: "Who should use multisig wallets?",
          options: ["Everyone", "Only beginners", "Advanced users or businesses", "No one"],
          correctAnswer: "Advanced users or businesses",
        },
      ],
    },
    {
      id: "self-custody-6",
      subject: "self-custody",
      title: "Hardware Wallets Deep Dive",
      description: "How hardware wallets work and why they're secure",
      difficulty: "intermediate",
      readingContent: `# Hardware Wallets Deep Dive

Hardware wallets are physical devices that store your private keys offline. They're like a USB drive, but specifically designed for cryptocurrency.

When you want to send Bitcoin, the hardware wallet signs the transaction internally. Your private key never leaves the device. This protects it from malware on your computer.

Popular brands include Ledger, Trezor, and Coldcard. Each has different features and price points. All provide strong security when used correctly.

The device has a screen and buttons. You verify transactions on the device itself, not just on your computer. This prevents malware from tricking you into sending to the wrong address.

Hardware wallets aren't perfect. They can be lost, stolen, or damaged. That's why backing up your seed phrase is still essential. The hardware wallet is just a convenient way to use your keys without exposing them.

For anyone holding significant amounts of Bitcoin, a hardware wallet is highly recommended. The security benefits far outweigh the cost.`,
      questions: [
        {
          id: "sc6-q1",
          type: "multiple-choice",
          question: "What happens to your private key when using a hardware wallet?",
          options: ["It leaves the device", "It never leaves the device", "It's stored online", "It's printed on paper"],
          correctAnswer: "It never leaves the device",
        },
        {
          id: "sc6-q2",
          type: "multiple-choice",
          question: "Why do hardware wallets have screens and buttons?",
          options: ["For decoration", "To verify transactions on the device", "To play games", "To charge the device"],
          correctAnswer: "To verify transactions on the device",
        },
        {
          id: "sc6-q3",
          type: "true-false",
          question: "Hardware wallets make backing up your seed phrase unnecessary.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "self-custody-7",
      subject: "self-custody",
      title: "Common Security Mistakes",
      description: "What not to do with your Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Common Security Mistakes

Many Bitcoin losses come from preventable mistakes. Learning what not to do is as important as learning what to do.

Never share your seed phrase with anyone. No legitimate service will ever ask for it. Scammers often pretend to be support staff and ask for your seed phrase - this is always a scam.

Don't store your seed phrase digitally. No photos, no cloud storage, no email, no text messages. Digital storage can be hacked, lost, or accessed by others.

Avoid "too good to be true" offers. If someone promises to double your Bitcoin or give you free Bitcoin, it's a scam. There's no such thing as free money.

Be careful with public Wi-Fi. Don't access your wallet on public networks. Use a VPN if you must.

Don't click suspicious links. Phishing attacks try to trick you into entering your seed phrase on fake websites. Always verify URLs carefully.

Keep your software updated. Wallet software updates often include security fixes. Running old software puts you at risk.

Remember: if it sounds too good to be true, it probably is. When in doubt, don't do it.`,
      questions: [
        {
          id: "sc7-q1",
          type: "true-false",
          question: "Legitimate services sometimes need your seed phrase for support.",
          correctAnswer: false,
        },
        {
          id: "sc7-q2",
          type: "multiple-choice",
          question: "What should you never do with your seed phrase?",
          options: ["Write it down", "Store it digitally", "Keep it secret", "Back it up"],
          correctAnswer: "Store it digitally",
        },
        {
          id: "sc7-q3",
          type: "multiple-choice",
          question: "What should you do if someone promises to double your Bitcoin?",
          options: ["Trust them", "Give them your seed phrase", "Recognize it as a scam", "Send them Bitcoin"],
          correctAnswer: "Recognize it as a scam",
        },
      ],
    },
    {
      id: "self-custody-8",
      subject: "self-custody",
      title: "Recovering Lost Wallets",
      description: "What to do if you lose access",
      difficulty: "intermediate",
      readingContent: `# Recovering Lost Wallets

If you lose access to your wallet, your seed phrase is your only hope. This is why backing it up is so critical.

If you have your seed phrase, recovery is straightforward. Install a compatible wallet app, choose "restore from seed phrase," and enter your words. Your Bitcoin will appear.

The order matters! Enter the words in the exact order you wrote them down. One wrong word or wrong order, and you'll get a different wallet (likely empty).

If you don't have your seed phrase, recovery is usually impossible. Bitcoin's security means there's no "forgot password" option. This is by design - it prevents others from accessing your funds.

Some people have lost Bitcoin by forgetting passwords, losing devices, or throwing away old hard drives. These losses are permanent. No one can help you recover Bitcoin if you don't have the keys.

This is why the backup process is so important. Take it seriously. Your future self will thank you.`,
      questions: [
        {
          id: "sc8-q1",
          type: "multiple-choice",
          question: "What do you need to recover a lost wallet?",
          options: ["Your password", "Your seed phrase", "Your email", "Your phone number"],
          correctAnswer: "Your seed phrase",
        },
        {
          id: "sc8-q2",
          type: "true-false",
          question: "If you lose your seed phrase, you can contact support to recover your Bitcoin.",
          correctAnswer: false,
        },
        {
          id: "sc8-q3",
          type: "multiple-choice",
          question: "What happens if you enter your seed phrase words in the wrong order?",
          options: ["Nothing", "You get a different wallet", "It still works", "You get an error message"],
          correctAnswer: "You get a different wallet",
        },
      ],
    },
    {
      id: "self-custody-9",
      subject: "self-custody",
      title: "Wallet Best Practices",
      description: "How to use your wallet safely",
      difficulty: "intermediate",
      readingContent: `# Wallet Best Practices

Good security habits protect your Bitcoin. Here are essential practices every Bitcoiner should follow.

Use a hardware wallet for significant amounts. For small daily-use amounts, a mobile wallet is fine. But anything you're saving should be on a hardware wallet.

Verify addresses carefully. When sending Bitcoin, always double-check the address. Malware can change addresses in your clipboard. Compare the first and last few characters.

Use a dedicated device if possible. A phone or computer used only for Bitcoin is less likely to have malware. Don't use the same device for torrenting or visiting sketchy websites.

Keep software updated. Wallet updates fix security vulnerabilities. But also be cautious - only update from official sources.

Don't reuse addresses. While not strictly necessary, using a new address for each transaction improves privacy.

Practice with small amounts first. Before moving large amounts, test the process with a small transaction. Make sure you understand how everything works.

These practices won't make you invincible, but they'll protect you from most common threats.`,
      questions: [
        {
          id: "sc9-q1",
          type: "multiple-choice",
          question: "What should you use for significant amounts of Bitcoin?",
          options: ["A mobile wallet", "A hardware wallet", "An exchange", "A paper wallet"],
          correctAnswer: "A hardware wallet",
        },
        {
          id: "sc9-q2",
          type: "true-false",
          question: "You should always verify Bitcoin addresses before sending.",
          correctAnswer: true,
        },
        {
          id: "sc9-q3",
          type: "multiple-choice",
          question: "What should you do before moving large amounts?",
          options: ["Nothing", "Practice with small amounts", "Ask strangers online", "Share your seed phrase"],
          correctAnswer: "Practice with small amounts",
        },
      ],
    },
    {
      id: "self-custody-10",
      subject: "self-custody",
      title: "Privacy and Bitcoin",
      description: "Understanding Bitcoin's privacy model",
      difficulty: "intermediate",
      readingContent: `# Privacy and Bitcoin

Bitcoin is often called "pseudonymous" rather than anonymous. All transactions are public on the blockchain, but they're linked to addresses, not names.

If someone knows your address, they can see all your transactions. This is why privacy matters. Once your identity is linked to an address, your entire transaction history becomes visible.

Good privacy practices: use new addresses for each transaction, don't reuse addresses, and be careful about linking your identity to addresses publicly.

Mixing services (also called tumblers) try to obscure transaction trails, but they're controversial and sometimes used for illegal purposes. Most experts recommend against them.

The Lightning Network provides better privacy for small transactions. Since transactions happen off-chain, they're not publicly visible on the blockchain.

Remember: Bitcoin transactions are permanent and public. Think carefully before linking your identity to any address. What you do today could be visible forever.`,
      questions: [
        {
          id: "sc10-q1",
          type: "multiple-choice",
          question: "What is Bitcoin often called instead of anonymous?",
          options: ["Private", "Pseudonymous", "Secret", "Hidden"],
          correctAnswer: "Pseudonymous",
        },
        {
          id: "sc10-q2",
          type: "true-false",
          question: "All Bitcoin transactions are completely private.",
          correctAnswer: false,
        },
        {
          id: "sc10-q3",
          type: "multiple-choice",
          question: "What happens if someone links your identity to a Bitcoin address?",
          options: ["Nothing", "They can see all your transactions", "You get more privacy", "Your Bitcoin doubles"],
          correctAnswer: "They can see all your transactions",
        },
      ],
    },
    {
      id: "self-custody-11",
      subject: "self-custody",
      title: "Inheritance Planning",
      description: "How to pass Bitcoin to heirs",
      difficulty: "advanced",
      readingContent: `# Inheritance Planning

Bitcoin inheritance is tricky. If you die without sharing your seed phrase, your Bitcoin is lost forever. No one can recover it - not your family, not a lawyer, not the government.

Planning ahead is essential. You need to ensure your heirs can access your Bitcoin without exposing it to risk while you're alive.

Options include: writing your seed phrase in a will (stored with a lawyer), using a multisig wallet where family members hold keys, or using a service that holds keys in escrow.

Some people use "dead man's switch" services that send instructions if you don't check in periodically. Others use time-locked transactions that become spendable after a certain date.

The challenge is balancing security (keeping keys secret) with accessibility (ensuring heirs can access them). Too secret, and your Bitcoin is lost. Too accessible, and it's at risk.

This is an area where Bitcoin's design creates real challenges. Traditional inheritance doesn't work the same way with Bitcoin. You need to plan specifically for it.`,
      questions: [
        {
          id: "sc11-q1",
          type: "true-false",
          question: "If you die without sharing your seed phrase, your family can recover your Bitcoin.",
          correctAnswer: false,
        },
        {
          id: "sc11-q2",
          type: "multiple-choice",
          question: "What is the challenge with Bitcoin inheritance?",
          options: ["It's too easy", "Balancing security with accessibility", "There are no challenges", "Bitcoin can't be inherited"],
          correctAnswer: "Balancing security with accessibility",
        },
        {
          id: "sc11-q3",
          type: "multiple-choice",
          question: "What happens to Bitcoin if the owner dies without planning?",
          options: ["It goes to the government", "It's lost forever", "It goes to family automatically", "It's donated to charity"],
          correctAnswer: "It's lost forever",
        },
      ],
    },
    {
      id: "self-custody-12",
      subject: "self-custody",
      title: "Advanced Security Strategies",
      description: "Next-level security for large holders",
      difficulty: "advanced",
      readingContent: `# Advanced Security Strategies

For large Bitcoin holdings, advanced security strategies become necessary. These go beyond basic wallet security.

Geographic distribution: Store backups in different physical locations. If one location has a disaster, others survive. This could mean seed phrases in different cities or countries.

Multi-signature with geographic keys: Use multisig where keys are stored in different locations. This protects against both theft and natural disasters.

Air-gapped devices: Computers that have never been connected to the internet. You generate transactions on an air-gapped device, transfer them via USB, and broadcast from a connected device. This keeps keys completely offline.

Shamir Secret Sharing: A method to split a secret into multiple parts. You need a certain number of parts to reconstruct it, but any individual part is useless. More advanced than simple multisig.

These strategies are complex and expensive. They're only worth it for significant holdings. For most people, a hardware wallet with proper backups is sufficient.

The key principle: as your holdings grow, your security should scale with it. Don't keep life-changing amounts in a mobile wallet.`,
      questions: [
        {
          id: "sc12-q1",
          type: "multiple-choice",
          question: "What is geographic distribution?",
          options: ["Storing backups in one location", "Storing backups in different locations", "Using only digital storage", "Sharing with friends"],
          correctAnswer: "Storing backups in different locations",
        },
        {
          id: "sc12-q2",
          type: "multiple-choice",
          question: "What is an air-gapped device?",
          options: ["A device connected to Wi-Fi", "A device that's never been online", "A mobile phone", "A hardware wallet"],
          correctAnswer: "A device that's never been online",
        },
        {
          id: "sc12-q3",
          type: "true-false",
          question: "Advanced security strategies are necessary for everyone.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "self-custody-13",
      subject: "self-custody",
      title: "The 25th Word (Passphrase)",
      description: "Adding an extra layer of security to your wallet",
      difficulty: "intermediate",
      readingContent: `# The 25th Word (Passphrase)

A passphrase (also called the 25th word) is an optional extra word or phrase you add to your seed phrase. It creates an additional wallet that's separate from your main wallet.

Here's how it works: Your 12 or 24-word seed phrase creates one wallet. Adding a passphrase creates a completely different wallet, even though the seed phrase is the same.

This is useful for security. If someone steals your seed phrase but doesn't know your passphrase, they can't access your Bitcoin. You can even keep a small amount in the wallet without the passphrase as a decoy.

The passphrase can be any word, phrase, or combination. It's case-sensitive and can include spaces and special characters. Make it memorable but hard to guess.

Important: If you forget your passphrase, you lose access to that wallet forever. There's no recovery. Write it down separately from your seed phrase, or use a password manager.

Some people use passphrases for different purposes: one wallet for savings (with passphrase), one for spending (without passphrase). This adds flexibility to your security strategy.

The passphrase is a powerful security feature, but it adds complexity. Make sure you understand it before using it, and always test recovery before storing significant amounts.`,
      questions: [
        {
          id: "sc13-q1",
          type: "multiple-choice",
          question: "What is a passphrase?",
          options: ["Your seed phrase", "An optional extra word that creates a different wallet", "A password for your exchange", "A type of wallet"],
          correctAnswer: "An optional extra word that creates a different wallet",
        },
        {
          id: "sc13-q2",
          type: "true-false",
          question: "If someone steals your seed phrase but not your passphrase, they can access your Bitcoin.",
          correctAnswer: false,
        },
        {
          id: "sc13-q3",
          type: "multiple-choice",
          question: "What happens if you forget your passphrase?",
          options: ["You can recover it", "You lose access to that wallet forever", "You can create a new one", "Support will help"],
          correctAnswer: "You lose access to that wallet forever",
        },
        {
          id: "sc13-q4",
          type: "true-false",
          question: "A passphrase can be used to create a decoy wallet.",
          correctAnswer: true,
        },
      ],
    },
    {
      id: "self-custody-14",
      subject: "self-custody",
      title: "Mobile Wallet Security",
      description: "Keeping your mobile Bitcoin wallet safe",
      difficulty: "intermediate",
      readingContent: `# Mobile Wallet Security

Mobile wallets are convenient but require careful security practices. Your phone is connected to the internet and can be lost, stolen, or hacked.

First, use a strong PIN or biometric lock on your phone. If someone gets physical access, this is your first line of defense. Don't use simple PINs like 1234 or your birthday.

Enable two-factor authentication if your wallet supports it. This adds an extra layer of security beyond your seed phrase.

Be careful with app permissions. Only grant necessary permissions. Some apps might try to access your camera, contacts, or other sensitive data.

Only download wallets from official app stores (Google Play, Apple App Store). Avoid third-party sources or sideloaded apps, which might be malicious.

Keep your phone's operating system updated. Updates often include security fixes. Running old software puts you at risk.

Don't store your seed phrase on your phone. No photos, no notes apps, no cloud storage. If your phone is compromised, your seed phrase could be stolen.

Consider using a dedicated phone for Bitcoin if you hold significant amounts. A phone used only for Bitcoin is less likely to have malware or be compromised.

Mobile wallets are great for small amounts and daily use. But for larger holdings, consider a hardware wallet instead.`,
      questions: [
        {
          id: "sc14-q1",
          type: "multiple-choice",
          question: "What should you use to lock your phone?",
          options: ["No lock", "A simple PIN like 1234", "A strong PIN or biometric lock", "Your birthday"],
          correctAnswer: "A strong PIN or biometric lock",
        },
        {
          id: "sc14-q2",
          type: "true-false",
          question: "You should store your seed phrase in a notes app on your phone.",
          correctAnswer: false,
        },
        {
          id: "sc14-q3",
          type: "multiple-choice",
          question: "Where should you download wallet apps from?",
          options: ["Third-party websites", "Official app stores", "Email links", "Social media"],
          correctAnswer: "Official app stores",
        },
        {
          id: "sc14-q4",
          type: "multiple-choice",
          question: "What should you do with your phone's operating system?",
          options: ["Never update it", "Keep it updated", "Downgrade it", "Ignore updates"],
          correctAnswer: "Keep it updated",
        },
      ],
    },
    {
      id: "self-custody-15",
      subject: "self-custody",
      title: "Desktop Wallet Security",
      description: "Protecting Bitcoin on your computer",
      difficulty: "intermediate",
      readingContent: `# Desktop Wallet Security

Desktop wallets run on your computer, which presents unique security challenges. Computers are more powerful than phones but also more vulnerable to malware.

Use antivirus software and keep it updated. Malware can steal your seed phrase or private keys if it infects your computer. Regular scans help detect threats.

Be careful what you download. Don't install software from untrusted sources. Malware often comes bundled with other software or from sketchy websites.

Use a firewall. This blocks unauthorized network access. Most operating systems have built-in firewalls - make sure they're enabled.

Keep your operating system updated. Security patches fix vulnerabilities that attackers exploit. Running outdated software is risky.

Consider using a dedicated computer for Bitcoin. A computer used only for Bitcoin, not for browsing, email, or other activities, is much safer.

Use full disk encryption. If your computer is stolen, encryption protects your data. Most modern operating systems support this.

Be careful with browser extensions. Some can steal data or modify websites. Only install extensions from trusted sources.

Desktop wallets are powerful but require more security awareness than mobile wallets. If you're not comfortable managing computer security, consider a hardware wallet instead.`,
      questions: [
        {
          id: "sc15-q1",
          type: "multiple-choice",
          question: "What should you use to protect your computer from malware?",
          options: ["Nothing", "Antivirus software", "Only trusted sources", "Both antivirus and careful downloading"],
          correctAnswer: "Both antivirus and careful downloading",
        },
        {
          id: "sc15-q2",
          type: "true-false",
          question: "You should keep your operating system updated for security.",
          correctAnswer: true,
        },
        {
          id: "sc15-q3",
          type: "multiple-choice",
          question: "What is a good practice for desktop wallet security?",
          options: ["Use any computer", "Use a dedicated computer for Bitcoin", "Never update software", "Disable firewalls"],
          correctAnswer: "Use a dedicated computer for Bitcoin",
        },
        {
          id: "sc15-q4",
          type: "true-false",
          question: "Full disk encryption protects your data if your computer is stolen.",
          correctAnswer: true,
        },
      ],
    },
    {
      id: "self-custody-16",
      subject: "self-custody",
      title: "Social Engineering Attacks",
      description: "How scammers try to steal your Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Social Engineering Attacks

Social engineering is when attackers trick you into giving them information or access. It's often more effective than hacking because it targets human psychology, not technology.

Common tactics include: pretending to be support staff and asking for your seed phrase, creating fake websites that look like real ones, sending phishing emails with malicious links, and creating fake social media accounts of people you trust.

The golden rule: No legitimate service will ever ask for your seed phrase. If someone asks for it, it's always a scam, no matter how official they seem.

Be suspicious of unsolicited contact. Real support staff don't randomly message you. If you need help, contact the service yourself through official channels.

Verify URLs carefully. Scammers create fake websites with similar URLs (like "coinbose.com" instead of "coinbase.com"). Always check the exact URL before entering any information.

Don't trust screenshots or videos. They can be faked. If someone shows you "proof" they can help, it's likely a scam.

Be careful with social media. Scammers create fake accounts impersonating Bitcoin influencers or companies. Verify accounts are real before trusting them.

The best defense is skepticism. If something seems too good to be true, it probably is. When in doubt, don't do it. Your Bitcoin security is more important than being polite.`,
      questions: [
        {
          id: "sc16-q1",
          type: "multiple-choice",
          question: "What is social engineering?",
          options: ["A type of wallet", "Tricking people into giving information", "A mining technique", "A type of transaction"],
          correctAnswer: "Tricking people into giving information",
        },
        {
          id: "sc16-q2",
          type: "true-false",
          question: "Legitimate services sometimes need your seed phrase for support.",
          correctAnswer: false,
        },
        {
          id: "sc16-q3",
          type: "multiple-choice",
          question: "What should you do if someone asks for your seed phrase?",
          options: ["Give it to them", "Recognize it as a scam", "Ask for their credentials", "Share it on social media"],
          correctAnswer: "Recognize it as a scam",
        },
        {
          id: "sc16-q4",
          type: "true-false",
          question: "You should always verify URLs before entering sensitive information.",
          correctAnswer: true,
        },
      ],
    },
    {
      id: "self-custody-17",
      subject: "self-custody",
      title: "Physical Security",
      description: "Protecting your hardware and backups",
      difficulty: "intermediate",
      readingContent: `# Physical Security

Physical security is about protecting your hardware wallets, backups, and devices from theft, loss, or damage. It's often overlooked but just as important as digital security.

Store hardware wallets in a safe place. A fireproof safe is ideal. Don't leave them in obvious places like desk drawers. If someone breaks into your home, they shouldn't be easy to find.

Protect your seed phrase backups. Paper backups can be destroyed by fire or water. Consider metal backups (steel plates) that can survive disasters. Store them in multiple secure locations.

Don't store everything in one place. If your home burns down, you lose both your hardware wallet and your backup. Store backups in different locations (home, office, bank deposit box).

Be careful who knows you have Bitcoin. Don't advertise your holdings. The less people know, the less likely you are to be targeted.

Consider home security. Alarms, cameras, and secure locks protect your physical assets. This might seem excessive, but for significant holdings, it's worth it.

When traveling, be extra careful. Don't bring your hardware wallet or seed phrase unless absolutely necessary. If you must, keep them secure and never leave them unattended.

Physical security complements digital security. Even the best digital security is useless if someone steals your hardware wallet and forces you to unlock it.`,
      questions: [
        {
          id: "sc17-q1",
          type: "multiple-choice",
          question: "Where should you store hardware wallets?",
          options: ["In obvious places", "In a fireproof safe", "On your desk", "In your car"],
          correctAnswer: "In a fireproof safe",
        },
        {
          id: "sc17-q2",
          type: "multiple-choice",
          question: "What can destroy paper seed phrase backups?",
          options: ["Nothing", "Fire and water", "Only fire", "Only water"],
          correctAnswer: "Fire and water",
        },
        {
          id: "sc17-q3",
          type: "true-false",
          question: "You should store all backups in one location.",
          correctAnswer: false,
        },
        {
          id: "sc17-q4",
          type: "multiple-choice",
          question: "What should you do regarding who knows you have Bitcoin?",
          options: ["Advertise it", "Tell everyone", "Be careful and don't advertise", "Post on social media"],
          correctAnswer: "Be careful and don't advertise",
        },
      ],
    },
    {
      id: "self-custody-18",
      subject: "self-custody",
      title: "Transaction Security",
      description: "Safely sending and receiving Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Transaction Security

Sending Bitcoin requires careful attention to detail. One mistake can result in permanent loss. Here's how to do it safely.

Always verify the recipient address. Check the first and last few characters. Malware can change addresses in your clipboard, so don't just copy and paste blindly.

Start with a small test transaction. Before sending large amounts, send a tiny amount first. Confirm it arrives, then send the rest. This catches errors before they're expensive.

Double-check the amount. Sending 1 BTC instead of 0.1 BTC is a costly mistake. Take your time and verify everything.

Use the right fee. Too low, and your transaction might take days. Too high, and you're wasting money. Most wallets estimate fees automatically, but you can adjust if needed.

Be careful with QR codes. Verify they match the intended address. Malicious QR codes can redirect payments. If possible, verify the address on the recipient's device.

Don't send to addresses from memory. Always copy and paste or scan QR codes. Human memory is unreliable for long strings of characters.

Keep transaction records. Screenshots or notes help you track what you sent, when, and to whom. This is useful for taxes and dispute resolution.

Transaction security is about being careful and methodical. Rushing leads to mistakes. Take your time, verify everything, and test with small amounts first.`,
      questions: [
        {
          id: "sc18-q1",
          type: "multiple-choice",
          question: "What should you do before sending large amounts?",
          options: ["Send immediately", "Send a small test transaction first", "Ask strangers online", "Skip verification"],
          correctAnswer: "Send a small test transaction first",
        },
        {
          id: "sc18-q2",
          type: "true-false",
          question: "You should always verify recipient addresses before sending.",
          correctAnswer: true,
        },
        {
          id: "sc18-q3",
          type: "multiple-choice",
          question: "Why should you check QR codes?",
          options: ["They're always safe", "Malicious QR codes can redirect payments", "QR codes don't matter", "They're too complicated"],
          correctAnswer: "Malicious QR codes can redirect payments",
        },
        {
          id: "sc18-q4",
          type: "true-false",
          question: "You should send Bitcoin to addresses from memory.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "self-custody-19",
      subject: "self-custody",
      title: "Choosing the Right Wallet",
      description: "How to select a wallet for your needs",
      difficulty: "intermediate",
      readingContent: `# Choosing the Right Wallet

With so many wallet options, choosing the right one can be overwhelming. Here's how to decide based on your needs.

For small amounts and daily use: Mobile wallets are perfect. They're convenient, easy to use, and good enough for small holdings. Examples include BlueWallet, Breez, and Phoenix.

For savings and larger amounts: Hardware wallets are essential. They're more secure and worth the cost for significant holdings. Popular options include Ledger, Trezor, and Coldcard.

For advanced users: Desktop wallets like Electrum offer more control and features. They're more complex but give you more options.

Consider your technical skill. Beginners should start with simple mobile wallets. As you learn more, you can graduate to hardware wallets or desktop wallets.

Check wallet reputation. Use well-known, reputable wallets. Avoid obscure wallets with little history. Research before downloading.

Open source is better. Open source wallets can be audited by anyone, making them more trustworthy. Closed source wallets are harder to verify.

Consider features you need. Do you need Lightning Network support? Multisig? Privacy features? Different wallets offer different features.

The best wallet is one you'll actually use correctly. A hardware wallet you don't use is less secure than a mobile wallet you use properly. Start simple, learn, then upgrade as needed.`,
      questions: [
        {
          id: "sc19-q1",
          type: "multiple-choice",
          question: "What type of wallet is best for small daily amounts?",
          options: ["Hardware wallets", "Mobile wallets", "Desktop wallets", "Paper wallets"],
          correctAnswer: "Mobile wallets",
        },
        {
          id: "sc19-q2",
          type: "multiple-choice",
          question: "What type of wallet is best for savings and larger amounts?",
          options: ["Mobile wallets", "Hardware wallets", "Exchange wallets", "Online wallets"],
          correctAnswer: "Hardware wallets",
        },
        {
          id: "sc19-q3",
          type: "true-false",
          question: "Open source wallets are generally more trustworthy.",
          correctAnswer: true,
        },
        {
          id: "sc19-q4",
          type: "multiple-choice",
          question: "What should beginners start with?",
          options: ["Complex desktop wallets", "Simple mobile wallets", "Hardware wallets only", "No wallet"],
          correctAnswer: "Simple mobile wallets",
        },
      ],
    },
    {
      id: "self-custody-20",
      subject: "self-custody",
      title: "Shamir Secret Sharing",
      description: "Advanced method for splitting secrets",
      difficulty: "advanced",
      readingContent: `# Shamir Secret Sharing

Shamir Secret Sharing (SSS) is a cryptographic method for splitting a secret into multiple parts. You need a certain number of parts to reconstruct the secret, but any individual part is useless.

For example, you could split your seed phrase into 5 parts, requiring any 3 to reconstruct it. This means you could lose 2 parts and still recover your Bitcoin. But an attacker would need to steal at least 3 parts.

This is more advanced than simple multisig. With multisig, you need multiple keys to spend. With SSS, you split a single secret (your seed phrase) into parts.

SSS is useful for inheritance planning. You could give parts to different family members. No single person can access the Bitcoin, but together they can.

It's also useful for geographic distribution. Store parts in different locations. Even if one location is compromised, your Bitcoin is safe.

However, SSS is complex. It requires special software and careful management. If you lose too many parts, you lose access forever. It's not for beginners.

Some hardware wallets support SSS natively. Others require third-party software. Make sure you understand how it works before using it.

SSS is a powerful tool for advanced users with significant holdings. For most people, a hardware wallet with proper backups is sufficient.`,
      questions: [
        {
          id: "sc20-q1",
          type: "multiple-choice",
          question: "What is Shamir Secret Sharing?",
          options: ["A type of wallet", "A method for splitting secrets into parts", "A mining technique", "An exchange"],
          correctAnswer: "A method for splitting secrets into parts",
        },
        {
          id: "sc20-q2",
          type: "multiple-choice",
          question: "If you split a secret into 5 parts requiring 3 to reconstruct, what happens if you lose 2 parts?",
          options: ["You lose access", "You can still recover with the remaining 3", "You need all 5", "Nothing happens"],
          correctAnswer: "You can still recover with the remaining 3",
        },
        {
          id: "sc20-q3",
          type: "true-false",
          question: "Shamir Secret Sharing is simple and recommended for beginners.",
          correctAnswer: false,
        },
        {
          id: "sc20-q4",
          type: "multiple-choice",
          question: "What is SSS useful for?",
          options: ["Daily spending", "Inheritance planning and geographic distribution", "Mining", "Trading"],
          correctAnswer: "Inheritance planning and geographic distribution",
        },
      ],
    },
    {
      id: "self-custody-21",
      subject: "self-custody",
      title: "Operational Security (OpSec)",
      description: "Protecting yourself and your Bitcoin in daily life",
      difficulty: "advanced",
      readingContent: `# Operational Security (OpSec)

Operational security (OpSec) is about protecting information that could be used against you. It's not just about technology - it's about how you live your life.

Don't advertise your Bitcoin holdings. Posting on social media about your Bitcoin makes you a target. Even vague hints can attract attention. Keep your holdings private.

Be careful with public Wi-Fi. Don't access your wallet on public networks. They're often insecure and can be monitored. Use a VPN if you must use public Wi-Fi.

Watch what you say. Conversations in public places can be overheard. Don't discuss your Bitcoin holdings, wallet types, or security practices where others might hear.

Be careful with metadata. Photos can contain location data. Social media posts can reveal patterns. Be mindful of what information you're sharing, even indirectly.

Use different passwords for different services. If one service is compromised, others remain safe. Consider a password manager to keep track of them all.

Be skeptical of "too good to be true" opportunities. Scammers target Bitcoin holders with investment schemes, giveaways, and other scams. If it sounds too good to be true, it probably is.

OpSec is about thinking like an attacker. What information would help someone steal your Bitcoin? Then protect that information. It's an ongoing process, not a one-time setup.

The goal isn't paranoia - it's awareness. You don't need to hide everything, but you should be thoughtful about what you share and with whom.`,
      questions: [
        {
          id: "sc21-q1",
          type: "multiple-choice",
          question: "What is operational security (OpSec)?",
          options: ["A type of wallet", "Protecting information that could be used against you", "A mining technique", "An exchange feature"],
          correctAnswer: "Protecting information that could be used against you",
        },
        {
          id: "sc21-q2",
          type: "true-false",
          question: "You should advertise your Bitcoin holdings on social media.",
          correctAnswer: false,
        },
        {
          id: "sc21-q3",
          type: "multiple-choice",
          question: "What should you do with public Wi-Fi?",
          options: ["Always use it", "Never access your wallet on it", "It's always safe", "Use it for everything"],
          correctAnswer: "Never access your wallet on it",
        },
        {
          id: "sc21-q4",
          type: "true-false",
          question: "OpSec is about being paranoid about everything.",
          correctAnswer: false,
        },
      ],
    },
    // ========== PROTOCOLS (21 lessons) ==========
    {
      id: "protocols-1",
      subject: "protocols",
      title: "How Bitcoin Works: The Basics",
      description: "Understanding the fundamental mechanics",
      difficulty: "beginner",
      readingContent: `# How Bitcoin Works: The Basics

Bitcoin is a decentralized digital currency. Unlike traditional money, there's no central bank or authority controlling it. Instead, it runs on a network of computers around the world.

When you send Bitcoin, you're creating a transaction. This transaction says "I'm sending X Bitcoin from my address to another address." You sign it with your private key to prove you own it.

The transaction is broadcast to the Bitcoin network. Miners collect transactions into blocks. They compete to solve a mathematical puzzle. The first to solve it gets to add their block to the blockchain and earns Bitcoin as a reward.

The blockchain is a public ledger. Every transaction is recorded permanently. Once a transaction is in a block, it can't be changed. This prevents double-spending and fraud.

This system works because everyone on the network agrees on the rules. No single person or organization controls Bitcoin - it's controlled by the network itself through consensus.`,
      questions: [
        {
          id: "p1-q1",
          type: "multiple-choice",
          question: "What is the blockchain?",
          options: ["A type of wallet", "A public ledger of all transactions", "A mining device", "A type of Bitcoin"],
          correctAnswer: "A public ledger of all transactions",
        },
        {
          id: "p1-q2",
          type: "true-false",
          question: "Bitcoin is controlled by a central bank.",
          correctAnswer: false,
        },
        {
          id: "p1-q3",
          type: "multiple-choice",
          question: "Who adds transactions to the blockchain?",
          options: ["Banks", "Miners", "Governments", "Exchanges"],
          correctAnswer: "Miners",
        },
      ],
    },
    {
      id: "protocols-2",
      subject: "protocols",
      title: "Mining and Proof of Work",
      description: "How miners secure the network",
      difficulty: "intermediate",
      readingContent: `# Mining and Proof of Work

Mining is how new Bitcoins are created and how transactions are confirmed. Miners use powerful computers to solve complex mathematical problems.

The process is called "Proof of Work." Miners compete to find a number (called a nonce) that, when combined with the block data, produces a hash below a certain target. It's like a lottery - the more computing power you have, the more "tickets" you have.

The difficulty adjusts every 2016 blocks (about two weeks) to keep block time around 10 minutes. If blocks are being found too quickly, difficulty increases. If too slowly, it decreases.

Miners are rewarded with newly created Bitcoin (the block reward) plus transaction fees. This incentivizes them to secure the network honestly.

Mining requires enormous amounts of electricity. This is Bitcoin's main criticism - the environmental impact. However, supporters argue that the security this provides is worth the cost, and that much mining uses renewable energy.

The mining process makes Bitcoin secure. To attack the network, you'd need more computing power than all honest miners combined - an extremely expensive proposition.`,
      questions: [
        {
          id: "p2-q1",
          type: "multiple-choice",
          question: "What is the process called where miners solve mathematical problems?",
          options: ["Proof of Stake", "Proof of Work", "Proof of Authority", "Proof of Concept"],
          correctAnswer: "Proof of Work",
        },
        {
          id: "p2-q2",
          type: "multiple-choice",
          question: "How often does Bitcoin difficulty adjust?",
          options: ["Every day", "Every week", "Every 2016 blocks", "Never"],
          correctAnswer: "Every 2016 blocks",
        },
        {
          id: "p2-q3",
          type: "true-false",
          question: "Mining requires very little electricity.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "protocols-3",
      subject: "protocols",
      title: "The Blockchain Structure",
      description: "How blocks are linked together",
      difficulty: "intermediate",
      readingContent: `# The Blockchain Structure

The blockchain is a chain of blocks. Each block contains transactions and a reference to the previous block. This creates an unbreakable chain going back to the first block (the Genesis Block).

Each block has a header containing: the previous block's hash, a Merkle root (a hash of all transactions), a timestamp, the difficulty target, and a nonce.

The hash of each block depends on its contents and the previous block's hash. If you change any transaction in a past block, its hash changes. This changes all subsequent blocks, breaking the chain.

This is why the blockchain is immutable. Changing history would require re-mining all blocks from that point forward, which is computationally impossible given the network's current hash rate.

The blockchain grows continuously. Every 10 minutes (on average), a new block is added. The chain is now over 800,000 blocks long and contains the complete history of every Bitcoin transaction ever made.

This structure is elegant and powerful. It provides both transparency (everyone can see all transactions) and security (no one can change them).`,
      questions: [
        {
          id: "p3-q1",
          type: "multiple-choice",
          question: "What is the first block in the blockchain called?",
          options: ["Block Zero", "The Genesis Block", "The First Block", "Block One"],
          correctAnswer: "The Genesis Block",
        },
        {
          id: "p3-q2",
          type: "true-false",
          question: "You can easily change transactions in past blocks.",
          correctAnswer: false,
        },
        {
          id: "p3-q3",
          type: "multiple-choice",
          question: "What happens if you change a transaction in a past block?",
          options: ["Nothing", "Only that block changes", "All subsequent blocks break", "You get free Bitcoin"],
          correctAnswer: "All subsequent blocks break",
        },
      ],
    },
    {
      id: "protocols-4",
      subject: "protocols",
      title: "Transactions and UTXOs",
      description: "Understanding how Bitcoin transactions work",
      difficulty: "intermediate",
      readingContent: `# Transactions and UTXOs

Bitcoin uses a model called UTXO (Unspent Transaction Output). Unlike bank accounts with balances, Bitcoin tracks individual "coins" (actually outputs from previous transactions).

When you receive Bitcoin, you receive a UTXO - an output from someone else's transaction. When you send Bitcoin, you spend one or more UTXOs and create new ones.

For example: Alice has a UTXO worth 1 BTC. She wants to send Bob 0.3 BTC. Her transaction spends the 1 BTC UTXO and creates two new UTXOs: 0.3 BTC to Bob and 0.7 BTC back to herself (change).

This model is different from account-based systems (like Ethereum) where you have a balance that goes up and down. UTXOs are more like physical coins - you spend whole coins and get change.

UTXOs make Bitcoin transactions atomic - they either fully succeed or fully fail. You can't partially spend a UTXO. This simplifies the system and prevents certain types of errors.

Understanding UTXOs helps you understand transaction fees (you pay for the data size, not the amount), and why you might have many small UTXOs that need to be combined.`,
      questions: [
        {
          id: "p4-q1",
          type: "multiple-choice",
          question: "What does UTXO stand for?",
          options: ["Unspent Transaction Output", "Used Transaction Output", "Unlimited Transaction Output", "Unique Transaction Output"],
          correctAnswer: "Unspent Transaction Output",
        },
        {
          id: "p4-q2",
          type: "true-false",
          question: "Bitcoin uses an account-based model like banks.",
          correctAnswer: false,
        },
        {
          id: "p4-q3",
          type: "multiple-choice",
          question: "What happens when you spend a 1 BTC UTXO to send 0.3 BTC?",
          options: ["You lose 0.7 BTC", "You get 0.7 BTC back as change", "The transaction fails", "You get 1.3 BTC"],
          correctAnswer: "You get 0.7 BTC back as change",
        },
      ],
    },
    {
      id: "protocols-5",
      subject: "protocols",
      title: "Digital Signatures",
      description: "How cryptography secures Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Digital Signatures

Bitcoin uses cryptography to secure transactions. Specifically, it uses digital signatures based on elliptic curve cryptography.

When you create a Bitcoin address, you generate a private key and a public key. The public key is used to create your address. The private key is kept secret.

To spend Bitcoin, you create a transaction and sign it with your private key. The signature proves you own the private key without revealing it. Anyone can verify the signature using your public key, but no one can create a valid signature without your private key.

This is the foundation of Bitcoin's security. You can prove ownership without revealing your secret. It's like having a lock that only your key can open, but everyone can see that the lock is yours.

The mathematics behind this is complex, but the concept is simple: your private key is a secret number. Your public key is derived from it mathematically. Signing is a mathematical operation that proves you know the secret without revealing it.

This cryptographic system has been battle-tested for decades. It's the same type of cryptography used to secure websites and online banking.`,
      questions: [
        {
          id: "p5-q1",
          type: "multiple-choice",
          question: "What do you use to sign a Bitcoin transaction?",
          options: ["Your public key", "Your private key", "Your address", "Your password"],
          correctAnswer: "Your private key",
        },
        {
          id: "p5-q2",
          type: "true-false",
          question: "A digital signature reveals your private key.",
          correctAnswer: false,
        },
        {
          id: "p5-q3",
          type: "multiple-choice",
          question: "What type of cryptography does Bitcoin use?",
          options: ["RSA", "Elliptic curve cryptography", "Quantum cryptography", "No cryptography"],
          correctAnswer: "Elliptic curve cryptography",
        },
      ],
    },
    {
      id: "protocols-6",
      subject: "protocols",
      title: "Network Consensus",
      description: "How the network agrees on the blockchain",
      difficulty: "advanced",
      readingContent: `# Network Consensus

Bitcoin's network must agree on which blockchain is valid. With thousands of nodes worldwide, how does everyone stay in sync?

The consensus mechanism is simple: the longest valid chain wins. When nodes see multiple versions of the blockchain, they choose the one with the most proof of work (the longest chain).

This works because creating blocks requires real work (electricity and computing power). An attacker would need more than 50% of the network's computing power to create a longer chain, which is extremely expensive.

Nodes validate every block and transaction. They check that transactions are valid (signatures are correct, no double-spending, etc.) and that blocks follow the rules. Invalid blocks are rejected.

If two miners find blocks simultaneously, the network temporarily splits. This is called a fork. Eventually, one chain becomes longer, and everyone switches to it. The shorter chain's transactions are "orphaned" (not included in the main chain).

This consensus mechanism is what makes Bitcoin decentralized. No single entity controls it - the network as a whole decides what's valid through the rules everyone follows.`,
      questions: [
        {
          id: "p6-q1",
          type: "multiple-choice",
          question: "Which blockchain do nodes choose when there are multiple versions?",
          options: ["The shortest", "The longest valid chain", "The newest", "A random one"],
          correctAnswer: "The longest valid chain",
        },
        {
          id: "p6-q2",
          type: "multiple-choice",
          question: "What happens when two miners find blocks at the same time?",
          options: ["Nothing", "The network forks temporarily", "Bitcoin breaks", "Everyone gets free Bitcoin"],
          correctAnswer: "The network forks temporarily",
        },
        {
          id: "p6-q3",
          type: "true-false",
          question: "A single entity controls the Bitcoin network.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "protocols-7",
      subject: "protocols",
      title: "Segregated Witness (SegWit)",
      description: "A major Bitcoin upgrade",
      difficulty: "intermediate",
      readingContent: `# Segregated Witness (SegWit)

SegWit was a major Bitcoin upgrade activated in 2017. It solved several problems and enabled new features.

The name comes from "segregating" the "witness" data (signatures) from the transaction data. Previously, signatures were embedded in transactions. SegWit moved them to a separate part of the block.

This change had several benefits: it increased the effective block size (more transactions per block), reduced transaction malleability (a security issue), and enabled the Lightning Network.

Transaction malleability was a problem where the transaction ID could be changed without invalidating the transaction. This made it hard to build second-layer solutions. SegWit fixed this.

The upgrade was controversial. Some wanted to increase the block size directly instead. This led to a "civil war" in the Bitcoin community and the creation of Bitcoin Cash (a fork with larger blocks).

SegWit adoption was gradual. It's now used by most transactions. The upgrade shows how Bitcoin can evolve while maintaining backward compatibility - old transactions still work, new ones can use SegWit.`,
      questions: [
        {
          id: "p7-q1",
          type: "multiple-choice",
          question: "What does SegWit stand for?",
          options: ["Secure Witness", "Segregated Witness", "Simple Witness", "Safe Witness"],
          correctAnswer: "Segregated Witness",
        },
        {
          id: "p7-q2",
          type: "multiple-choice",
          question: "What problem did SegWit solve?",
          options: ["High prices", "Transaction malleability", "Slow internet", "Bad weather"],
          correctAnswer: "Transaction malleability",
        },
        {
          id: "p7-q3",
          type: "true-false",
          question: "SegWit made old Bitcoin transactions stop working.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "protocols-8",
      subject: "protocols",
      title: "The Lightning Network",
      description: "Bitcoin's second-layer scaling solution",
      difficulty: "intermediate",
      readingContent: `# The Lightning Network

The Lightning Network is a "second layer" built on top of Bitcoin. It enables instant, cheap transactions by moving them off the main blockchain.

Here's how it works: two parties open a payment channel by creating a transaction on the blockchain. They can then make unlimited transactions between themselves instantly and for free. When done, they close the channel with a final transaction on the blockchain.

Multiple channels can be connected to form a network. You can pay someone even if you don't have a direct channel with them - the payment routes through intermediate channels.

Lightning transactions are nearly instant and cost fractions of a cent. This makes Bitcoin usable for everyday purchases like coffee. The main blockchain is too slow and expensive for this.

Lightning is still developing. It requires both parties to be online, and there are some technical complexities. But it's already being used for real payments around the world.

The Lightning Network shows how Bitcoin can scale without changing the base layer. The main blockchain remains secure and decentralized, while Lightning provides speed and low fees.`,
      questions: [
        {
          id: "p8-q1",
          type: "multiple-choice",
          question: "What is the Lightning Network?",
          options: ["A type of wallet", "A second-layer scaling solution", "A mining pool", "An exchange"],
          correctAnswer: "A second-layer scaling solution",
        },
        {
          id: "p8-q2",
          type: "multiple-choice",
          question: "What are Lightning transactions like?",
          options: ["Slow and expensive", "Instant and cheap", "Medium speed and cost", "Not possible"],
          correctAnswer: "Instant and cheap",
        },
        {
          id: "p8-q3",
          type: "true-false",
          question: "Lightning Network requires changing the Bitcoin base layer.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "protocols-9",
      subject: "protocols",
      title: "Taproot Upgrade",
      description: "Bitcoin's latest major upgrade",
      difficulty: "advanced",
      readingContent: `# Taproot Upgrade

Taproot was activated in 2021, Bitcoin's first major upgrade since SegWit. It improves privacy, efficiency, and enables new features.

Taproot makes complex transactions (like multisig) look the same as simple transactions on the blockchain. This improves privacy - observers can't tell if you're using advanced features.

It also reduces transaction sizes, making them cheaper. A Taproot transaction is smaller than an equivalent pre-Taproot transaction.

Taproot enables "smart contracts" on Bitcoin. While not as flexible as Ethereum's smart contracts, it allows for more complex transaction types like time-locked transactions and advanced multisig setups.

The upgrade was carefully designed to be backward-compatible. Old transactions still work, and new ones can opt into Taproot features.

Taproot represents Bitcoin's philosophy: conservative, careful upgrades that improve the system without breaking existing functionality. It took years of development and testing before activation.`,
      questions: [
        {
          id: "p9-q1",
          type: "multiple-choice",
          question: "When was Taproot activated?",
          options: ["2017", "2019", "2021", "2023"],
          correctAnswer: "2021",
        },
        {
          id: "p9-q2",
          type: "multiple-choice",
          question: "What does Taproot improve?",
          options: ["Mining speed", "Privacy and efficiency", "Block size", "Nothing"],
          correctAnswer: "Privacy and efficiency",
        },
        {
          id: "p9-q3",
          type: "true-false",
          question: "Taproot makes complex transactions look different from simple ones.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "protocols-10",
      subject: "protocols",
      title: "Bitcoin Script",
      description: "Bitcoin's programming language",
      difficulty: "advanced",
      readingContent: `# Bitcoin Script

Bitcoin has a simple programming language called Script. It's used to define the conditions under which Bitcoin can be spent.

Most transactions use a simple script: "This Bitcoin can be spent by anyone who provides a valid signature matching this public key." This is a standard Pay-to-Public-Key-Hash (P2PKH) transaction.

But Script can do more. It can require multiple signatures (multisig), time locks (can't spend until a certain date), or other conditions.

Script is intentionally limited. It's not Turing-complete like Ethereum's Solidity. You can't write arbitrary programs. This limitation is by design - it keeps Bitcoin simple, secure, and predictable.

Common script types include: P2PKH (standard transactions), P2SH (script hash, used for multisig), P2WPKH (SegWit version), and P2TR (Taproot).

Understanding Script helps you understand how Bitcoin transactions work under the hood. Most users never need to know this, but it's fascinating for those interested in the technical details.`,
      questions: [
        {
          id: "p10-q1",
          type: "multiple-choice",
          question: "What is Bitcoin Script?",
          options: ["A wallet", "A programming language", "A mining algorithm", "An exchange"],
          correctAnswer: "A programming language",
        },
        {
          id: "p10-q2",
          type: "true-false",
          question: "Bitcoin Script is Turing-complete like Ethereum.",
          correctAnswer: false,
        },
        {
          id: "p10-q3",
          type: "multiple-choice",
          question: "What does P2PKH stand for?",
          options: ["Pay to Public Key Hash", "Private to Public Key Hash", "Public to Private Key Hash", "Pay to Private Key Hash"],
          correctAnswer: "Pay to Public Key Hash",
        },
      ],
    },
    {
      id: "protocols-11",
      subject: "protocols",
      title: "Network Nodes",
      description: "The computers that run Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Network Nodes

Bitcoin nodes are computers running Bitcoin software. They maintain a copy of the blockchain and help validate and relay transactions.

Full nodes download and store the entire blockchain. They validate every block and transaction according to Bitcoin's rules. They reject anything invalid.

Running a full node gives you sovereignty. You don't have to trust anyone else's version of the blockchain. You verify everything yourself.

Light nodes (SPV nodes) don't download the full blockchain. They only download block headers and rely on full nodes for transaction data. They're less secure but use less resources.

Most Bitcoin users don't run nodes - they use wallets that connect to someone else's node. But running your own node is the most secure way to use Bitcoin.

Nodes communicate using the Bitcoin protocol. They share blocks and transactions, helping keep the network in sync. Anyone can run a node - there's no permission required. This is part of Bitcoin's decentralization.`,
      questions: [
        {
          id: "p11-q1",
          type: "multiple-choice",
          question: "What do full nodes do?",
          options: ["Only mine", "Download and validate the entire blockchain", "Only send transactions", "Nothing"],
          correctAnswer: "Download and validate the entire blockchain",
        },
        {
          id: "p11-q2",
          type: "true-false",
          question: "You need permission to run a Bitcoin node.",
          correctAnswer: false,
        },
        {
          id: "p11-q3",
          type: "multiple-choice",
          question: "What is the most secure way to use Bitcoin?",
          options: ["Using an exchange", "Running your own node", "Using a mobile wallet", "Asking friends"],
          correctAnswer: "Running your own node",
        },
      ],
    },
    {
      id: "protocols-12",
      subject: "protocols",
      title: "Bitcoin's Future Upgrades",
      description: "What's coming next for Bitcoin",
      difficulty: "advanced",
      readingContent: `# Bitcoin's Future Upgrades

Bitcoin upgrades are slow and careful. The community values stability and security over new features. But upgrades do happen.

Potential future upgrades include: Schnorr signatures (already partially in Taproot), which make multisig transactions smaller and more private; drivechains, which would allow sidechains with different rules; and various scaling improvements.

The upgrade process is conservative. Changes require broad consensus. There's no central authority to push upgrades through. This can be frustrating for those who want faster innovation, but it's what makes Bitcoin reliable.

Some ideas are controversial. Drivechains, for example, are debated. Some see them as necessary for Bitcoin's growth. Others see them as risky changes to Bitcoin's security model.

The Lightning Network continues to evolve. New features are being added regularly. This is where most innovation happens - on layers built on top of Bitcoin, not changes to Bitcoin itself.

Bitcoin's future will likely see continued development of second-layer solutions rather than frequent base-layer changes. This maintains Bitcoin's stability while enabling innovation.`,
      questions: [
        {
          id: "p12-q1",
          type: "multiple-choice",
          question: "How does Bitcoin approach upgrades?",
          options: ["Quickly and frequently", "Slowly and carefully", "Never upgrades", "Randomly"],
          correctAnswer: "Slowly and carefully",
        },
        {
          id: "p12-q2",
          type: "true-false",
          question: "Bitcoin upgrades require broad consensus.",
          correctAnswer: true,
        },
        {
          id: "p12-q3",
          type: "multiple-choice",
          question: "Where is most Bitcoin innovation happening?",
          options: ["Base layer changes", "Second-layer solutions", "Mining", "Exchanges"],
          correctAnswer: "Second-layer solutions",
        },
      ],
    },
    {
      id: "protocols-13",
      subject: "protocols",
      title: "Hash Functions and Cryptography",
      description: "The mathematical foundation of Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Hash Functions and Cryptography

Hash functions are mathematical functions that take any input and produce a fixed-size output. They're one-way functions - easy to compute in one direction, but nearly impossible to reverse.

Bitcoin uses SHA-256, a cryptographic hash function. When you put data into SHA-256, you get a 256-bit (32-byte) output. Change even one character of the input, and the output completely changes.

Hash functions have important properties: they're deterministic (same input always gives same output), fast to compute, and produce seemingly random outputs. They're used throughout Bitcoin for security.

In mining, miners hash block data with different nonces until they find a hash below the target. This is proof of work - proving you did computational work.

Hash functions also create the blockchain's immutability. Each block contains the hash of the previous block. Change any block, and its hash changes, breaking the chain.

Bitcoin addresses are also created using hash functions. Your public key is hashed to create your address, providing a layer of privacy and security.

Understanding hash functions helps you understand why Bitcoin is secure. The mathematics are sound and have been tested for decades.`,
      questions: [
        {
          id: "p13-q1",
          type: "multiple-choice",
          question: "What hash function does Bitcoin use?",
          options: ["SHA-1", "SHA-256", "MD5", "RSA"],
          correctAnswer: "SHA-256",
        },
        {
          id: "p13-q2",
          type: "true-false",
          question: "Hash functions are easy to reverse.",
          correctAnswer: false,
        },
        {
          id: "p13-q3",
          type: "multiple-choice",
          question: "What happens if you change one character in the input to a hash function?",
          options: ["Nothing", "The output completely changes", "The output stays the same", "You get an error"],
          correctAnswer: "The output completely changes",
        },
        {
          id: "p13-q4",
          type: "multiple-choice",
          question: "What property of hash functions creates blockchain immutability?",
          options: ["They're fast", "They're one-way", "They're random", "They're small"],
          correctAnswer: "They're one-way",
        },
      ],
    },
    {
      id: "protocols-14",
      subject: "protocols",
      title: "Merkle Trees",
      description: "How Bitcoin efficiently verifies transactions",
      difficulty: "intermediate",
      readingContent: `# Merkle Trees

A Merkle tree is a data structure that allows efficient verification of large datasets. Bitcoin uses Merkle trees to organize transactions in blocks.

Here's how it works: transactions are paired and hashed together. Those hashes are paired and hashed again. This continues until there's a single "root" hash at the top - the Merkle root.

The Merkle root is included in the block header. It represents all transactions in the block. If any transaction changes, the Merkle root changes.

Merkle trees enable efficient verification. To prove a transaction is in a block, you only need a small "proof" - a few hashes along the path from the transaction to the root. You don't need to download all transactions.

This is crucial for SPV (Simplified Payment Verification) wallets. They can verify transactions without downloading the entire blockchain. They just need block headers and Merkle proofs.

Merkle trees also enable parallel processing. Different parts of the tree can be computed simultaneously, making block validation faster.

The Merkle tree structure is elegant and efficient. It's one of the clever design choices that makes Bitcoin scalable and verifiable.`,
      questions: [
        {
          id: "p14-q1",
          type: "multiple-choice",
          question: "What is a Merkle tree?",
          options: ["A type of wallet", "A data structure for organizing transactions", "A mining algorithm", "An exchange"],
          correctAnswer: "A data structure for organizing transactions",
        },
        {
          id: "p14-q2",
          type: "multiple-choice",
          question: "What is stored in the block header?",
          options: ["All transactions", "The Merkle root", "Private keys", "Addresses"],
          correctAnswer: "The Merkle root",
        },
        {
          id: "p14-q3",
          type: "true-false",
          question: "Merkle trees allow SPV wallets to verify transactions without the full blockchain.",
          correctAnswer: true,
        },
        {
          id: "p14-q4",
          type: "multiple-choice",
          question: "What happens to the Merkle root if any transaction in a block changes?",
          options: ["Nothing", "It changes", "It doubles", "It disappears"],
          correctAnswer: "It changes",
        },
      ],
    },
    {
      id: "protocols-15",
      subject: "protocols",
      title: "Difficulty Adjustment",
      description: "How Bitcoin maintains consistent block times",
      difficulty: "intermediate",
      readingContent: `# Difficulty Adjustment

Bitcoin aims to produce a new block every 10 minutes on average. But mining power fluctuates - more miners join, others leave, hardware gets better. How does Bitcoin maintain consistent block times?

The answer is difficulty adjustment. Every 2016 blocks (approximately two weeks), Bitcoin recalculates the mining difficulty based on how long it took to mine the previous 2016 blocks.

If blocks were found too quickly (less than 10 minutes on average), difficulty increases. If they were found too slowly (more than 10 minutes), difficulty decreases.

The difficulty is a target hash value. Miners must find a hash below this target. Lower target = harder to find = higher difficulty.

This creates a self-regulating system. When more miners join, blocks come faster, difficulty increases, and block times return to ~10 minutes. When miners leave, the opposite happens.

The difficulty adjustment is crucial for Bitcoin's security and predictability. It ensures the network maintains consistent block production regardless of mining power fluctuations.

This mechanism has worked remarkably well. Despite massive changes in mining power over the years, Bitcoin has maintained roughly 10-minute block times since its inception.`,
      questions: [
        {
          id: "p15-q1",
          type: "multiple-choice",
          question: "How often does Bitcoin adjust difficulty?",
          options: ["Every block", "Every day", "Every 2016 blocks", "Never"],
          correctAnswer: "Every 2016 blocks",
        },
        {
          id: "p15-q2",
          type: "multiple-choice",
          question: "What is Bitcoin's target block time?",
          options: ["1 minute", "5 minutes", "10 minutes", "15 minutes"],
          correctAnswer: "10 minutes",
        },
        {
          id: "p15-q3",
          type: "true-false",
          question: "If blocks are found too quickly, difficulty decreases.",
          correctAnswer: false,
        },
        {
          id: "p15-q4",
          type: "multiple-choice",
          question: "What happens when more miners join the network?",
          options: ["Difficulty stays the same", "Difficulty increases", "Difficulty decreases", "Bitcoin breaks"],
          correctAnswer: "Difficulty increases",
        },
      ],
    },
    {
      id: "protocols-16",
      subject: "protocols",
      title: "Transaction Fees",
      description: "How fees work and why they matter",
      difficulty: "intermediate",
      readingContent: `# Transaction Fees

Bitcoin transactions include fees paid to miners. These fees serve two purposes: they incentivize miners to include your transaction, and they'll replace block rewards as Bitcoin's supply runs out.

Fees are calculated based on transaction size (in bytes), not the amount being sent. A transaction sending 1 BTC can have a lower fee than one sending 0.001 BTC if it's smaller in bytes.

Transaction size depends on the number of inputs and outputs. More UTXOs being spent = larger transaction = higher fee. This is why consolidating small UTXOs can be beneficial.

Miners prioritize transactions with higher fees. During busy periods, you might need to pay higher fees to get your transaction confirmed quickly. During quiet periods, low fees work fine.

The fee market is dynamic. It fluctuates based on network demand. When many people want to transact, fees rise. When the network is quiet, fees fall.

In the future, as block rewards decrease (due to halvings), transaction fees will become miners' primary income. This transition is already beginning, with fees sometimes exceeding block rewards during high-demand periods.

Understanding fees helps you make better decisions about when and how to transact. Sometimes it's worth waiting for lower fees, other times speed is worth paying more.`,
      questions: [
        {
          id: "p16-q1",
          type: "multiple-choice",
          question: "How are Bitcoin transaction fees calculated?",
          options: ["By amount sent", "By transaction size in bytes", "By time of day", "Randomly"],
          correctAnswer: "By transaction size in bytes",
        },
        {
          id: "p16-q2",
          type: "multiple-choice",
          question: "What do miners prioritize?",
          options: ["Oldest transactions", "Transactions with higher fees", "Random transactions", "Small transactions"],
          correctAnswer: "Transactions with higher fees",
        },
        {
          id: "p16-q3",
          type: "true-false",
          question: "Transaction fees will become miners' primary income as block rewards decrease.",
          correctAnswer: true,
        },
        {
          id: "p16-q4",
          type: "multiple-choice",
          question: "What makes a transaction larger (and thus more expensive)?",
          options: ["Sending more Bitcoin", "More inputs and outputs", "Using a mobile wallet", "Sending to multiple addresses"],
          correctAnswer: "More inputs and outputs",
        },
      ],
    },
    {
      id: "protocols-17",
      subject: "protocols",
      title: "Bitcoin Address Types",
      description: "Understanding different address formats",
      difficulty: "intermediate",
      readingContent: `# Bitcoin Address Types

Bitcoin has evolved different address types over time. Each has different features and characteristics.

Legacy addresses (P2PKH) start with "1". These are the original Bitcoin addresses. They're still valid and work fine, but they're less efficient than newer types.

P2SH addresses start with "3". They're used for scripts (like multisig). They're more flexible than legacy addresses and can support more complex spending conditions.

Bech32 addresses (native SegWit) start with "bc1". They're the most efficient - transactions using them are smaller and cheaper. They're also more error-resistant (fewer typos when copying).

Taproot addresses (P2TR) also start with "bc1" but are longer. They're the newest type, enabled by the Taproot upgrade. They offer better privacy and efficiency.

All address types are compatible. You can send Bitcoin from any type to any other type. The address type just determines how the Bitcoin can be spent.

Modern wallets typically generate Bech32 or Taproot addresses by default. But you can still receive to older address types if needed. The network supports them all.`,
      questions: [
        {
          id: "p17-q1",
          type: "multiple-choice",
          question: "What do legacy Bitcoin addresses start with?",
          options: ["1", "3", "bc1", "0"],
          correctAnswer: "1",
        },
        {
          id: "p17-q2",
          type: "multiple-choice",
          question: "What are Bech32 addresses?",
          options: ["Legacy addresses", "Native SegWit addresses", "Multisig addresses", "Old addresses"],
          correctAnswer: "Native SegWit addresses",
        },
        {
          id: "p17-q3",
          type: "true-false",
          question: "You can send Bitcoin from any address type to any other address type.",
          correctAnswer: true,
        },
        {
          id: "p17-q4",
          type: "multiple-choice",
          question: "Which address type offers the best efficiency?",
          options: ["Legacy (P2PKH)", "P2SH", "Bech32 (native SegWit)", "All are equal"],
          correctAnswer: "Bech32 (native SegWit)",
        },
      ],
    },
    {
      id: "protocols-18",
      subject: "protocols",
      title: "Schnorr Signatures",
      description: "Bitcoin's improved signature scheme",
      difficulty: "advanced",
      readingContent: `# Schnorr Signatures

Schnorr signatures are an improvement over Bitcoin's current ECDSA signatures. They're already partially implemented in Taproot, and full adoption is expected in future upgrades.

Schnorr signatures have several advantages: they're more efficient (smaller and faster to verify), they enable signature aggregation (multiple signatures can be combined into one), and they have better mathematical properties.

Signature aggregation is particularly powerful. In a multisig transaction, instead of including multiple signatures, you can combine them into a single signature. This makes multisig transactions smaller and cheaper.

Schnorr signatures also improve privacy. Aggregated signatures look the same whether they're from a single signer or multiple signers. This makes it harder for observers to identify multisig transactions.

The mathematics behind Schnorr signatures are well-understood and secure. They've been studied for decades and are considered superior to ECDSA in many ways.

Taproot already uses Schnorr signatures for its key path spends. Future upgrades may extend Schnorr to all Bitcoin transactions, replacing ECDSA entirely.

This upgrade will make Bitcoin more efficient and private, especially for complex transactions like multisig. It's a technical improvement that benefits all users.`,
      questions: [
        {
          id: "p18-q1",
          type: "multiple-choice",
          question: "What are Schnorr signatures?",
          options: ["A type of wallet", "An improved signature scheme", "A mining algorithm", "An exchange"],
          correctAnswer: "An improved signature scheme",
        },
        {
          id: "p18-q2",
          type: "multiple-choice",
          question: "What is signature aggregation?",
          options: ["Combining multiple signatures into one", "Splitting one signature into many", "Deleting signatures", "Copying signatures"],
          correctAnswer: "Combining multiple signatures into one",
        },
        {
          id: "p18-q3",
          type: "true-false",
          question: "Schnorr signatures are already partially used in Taproot.",
          correctAnswer: true,
        },
        {
          id: "p18-q4",
          type: "multiple-choice",
          question: "What advantage do Schnorr signatures provide for multisig?",
          options: ["They're slower", "They make transactions smaller and cheaper", "They're less secure", "They don't work with multisig"],
          correctAnswer: "They make transactions smaller and cheaper",
        },
      ],
    },
    {
      id: "protocols-19",
      subject: "protocols",
      title: "Timelocks and Smart Contracts",
      description: "Bitcoin's programmable money features",
      difficulty: "advanced",
      readingContent: `# Timelocks and Smart Contracts

Bitcoin has limited but powerful scripting capabilities. While not as flexible as Ethereum, Bitcoin can execute certain types of "smart contracts" using Script.

Timelocks are one example. They allow you to lock Bitcoin until a certain time or block height. You can create a transaction that can't be spent until a future date.

There are two types: absolute timelocks (spendable after a specific time) and relative timelocks (spendable after a certain number of blocks from when it was created).

Timelocks enable various use cases: inheritance planning (Bitcoin becomes spendable after your death), escrow (locked until conditions are met), and payment channels (used in Lightning Network).

Multisig is another form of smart contract. It requires multiple signatures to spend, enabling shared control, escrow, and security features.

Hashed timelock contracts (HTLCs) are used in the Lightning Network. They allow conditional payments - Bitcoin can be claimed if you know a secret, or returned after a timeout.

While Bitcoin's scripting is limited compared to other blockchains, this limitation is intentional. It keeps Bitcoin simple, secure, and predictable. Complex smart contracts can be built on layers above Bitcoin.`,
      questions: [
        {
          id: "p19-q1",
          type: "multiple-choice",
          question: "What are timelocks?",
          options: ["A type of wallet", "A way to lock Bitcoin until a certain time", "A mining feature", "An exchange feature"],
          correctAnswer: "A way to lock Bitcoin until a certain time",
        },
        {
          id: "p19-q2",
          type: "multiple-choice",
          question: "What are the two types of timelocks?",
          options: ["Fast and slow", "Absolute and relative", "Big and small", "Old and new"],
          correctAnswer: "Absolute and relative",
        },
        {
          id: "p19-q3",
          type: "true-false",
          question: "Bitcoin's scripting capabilities are more flexible than Ethereum's.",
          correctAnswer: false,
        },
        {
          id: "p19-q4",
          type: "multiple-choice",
          question: "What are HTLCs used for?",
          options: ["Mining", "The Lightning Network", "Exchanges", "Wallets"],
          correctAnswer: "The Lightning Network",
        },
      ],
    },
    {
      id: "protocols-20",
      subject: "protocols",
      title: "Bitcoin Improvement Proposals (BIPs)",
      description: "How Bitcoin evolves through community consensus",
      difficulty: "intermediate",
      readingContent: `# Bitcoin Improvement Proposals (BIPs)

BIPs are documents that propose changes or additions to Bitcoin. They're the formal process for discussing and implementing improvements to the protocol.

BIPs go through several stages: Draft (initial proposal), Proposed (ready for review), Final (accepted and implemented), or Rejected/Withdrawn.

Anyone can propose a BIP. The process is open and transparent. Proposals are discussed on mailing lists, forums, and at conferences. The community debates their merits.

Famous BIPs include: BIP 32 (Hierarchical Deterministic Wallets), BIP 39 (Mnemonic Seed Phrases), BIP 141 (SegWit), and BIP 340 (Schnorr Signatures).

Not all BIPs are protocol changes. Some describe standards (like address formats), some are informational, and some are process improvements.

The BIP process ensures Bitcoin evolves carefully. Proposals are thoroughly reviewed, debated, and tested before implementation. This prevents hasty changes that could break Bitcoin.

The process is decentralized. No single person or organization controls it. Developers, miners, node operators, and users all participate. This is how Bitcoin maintains its decentralized nature even as it evolves.`,
      questions: [
        {
          id: "p20-q1",
          type: "multiple-choice",
          question: "What does BIP stand for?",
          options: ["Bitcoin Investment Plan", "Bitcoin Improvement Proposal", "Bitcoin Internet Protocol", "Bitcoin Initial Purchase"],
          correctAnswer: "Bitcoin Improvement Proposal",
        },
        {
          id: "p20-q2",
          type: "multiple-choice",
          question: "Who can propose a BIP?",
          options: ["Only developers", "Only miners", "Anyone", "Only Satoshi"],
          correctAnswer: "Anyone",
        },
        {
          id: "p20-q3",
          type: "true-false",
          question: "All BIPs are protocol changes.",
          correctAnswer: false,
        },
        {
          id: "p20-q4",
          type: "multiple-choice",
          question: "What BIP introduced mnemonic seed phrases?",
          options: ["BIP 32", "BIP 39", "BIP 141", "BIP 340"],
          correctAnswer: "BIP 39",
        },
      ],
    },
    {
      id: "protocols-21",
      subject: "protocols",
      title: "Sidechains and Layer 2 Solutions",
      description: "Scaling Bitcoin beyond the main chain",
      difficulty: "advanced",
      readingContent: `# Sidechains and Layer 2 Solutions

Bitcoin's main blockchain has limitations: it can only handle about 7 transactions per second, and transactions can be slow and expensive. Layer 2 solutions address these limitations.

The Lightning Network is the most famous Layer 2 solution. It enables instant, cheap transactions by moving them off-chain. But it's not the only approach.

Sidechains are separate blockchains that are pegged to Bitcoin. You can move Bitcoin to a sidechain, use it there (with different rules, faster blocks, etc.), then move it back. Examples include Liquid Network and Rootstock.

Drivechains are a proposed sidechain mechanism that would allow sidechains with different consensus rules while maintaining Bitcoin's security. They're controversial and not yet implemented.

State channels (like Lightning) allow off-chain transactions that can be settled on-chain when needed. They're good for high-frequency, low-value transactions.

Each solution has trade-offs. Lightning is great for payments but requires both parties online. Sidechains offer more features but add complexity. The main chain remains the most secure.

The future of Bitcoin scaling likely involves multiple Layer 2 solutions for different use cases. The main chain will remain the secure foundation, while layers above provide speed and features.`,
      questions: [
        {
          id: "p21-q1",
          type: "multiple-choice",
          question: "What are sidechains?",
          options: ["A type of wallet", "Separate blockchains pegged to Bitcoin", "Mining pools", "Exchanges"],
          correctAnswer: "Separate blockchains pegged to Bitcoin",
        },
        {
          id: "p21-q2",
          type: "multiple-choice",
          question: "What is the most famous Bitcoin Layer 2 solution?",
          options: ["Liquid", "Rootstock", "Lightning Network", "Drivechains"],
          correctAnswer: "Lightning Network",
        },
        {
          id: "p21-q3",
          type: "true-false",
          question: "Layer 2 solutions replace the need for Bitcoin's main chain.",
          correctAnswer: false,
        },
        {
          id: "p21-q4",
          type: "multiple-choice",
          question: "What is a limitation of the Lightning Network?",
          options: ["It's too fast", "Both parties must be online", "It's too cheap", "It's too secure"],
          correctAnswer: "Both parties must be online",
        },
      ],
    },
    // ========== ECONOMICS (21 lessons) ==========
    {
      id: "economics-1",
      subject: "economics",
      title: "Bitcoin as Digital Gold",
      description: "Understanding Bitcoin's store of value proposition",
      difficulty: "beginner",
      readingContent: `# Bitcoin as Digital Gold

Bitcoin is often called "digital gold." Like gold, it's scarce, durable, portable, and divisible. But Bitcoin has advantages gold doesn't have.

Gold is physical. You can't easily send it across the world. Bitcoin is digital - you can send it anywhere instantly. Gold is heavy and expensive to store securely. Bitcoin is just data.

Both are scarce. Gold is limited by what exists in the earth. Bitcoin is limited by code - only 21 million will ever exist. This scarcity gives both value.

Gold has been a store of value for thousands of years. Bitcoin is trying to be the digital equivalent - a way to preserve wealth that doesn't depend on any government or bank.

The "digital gold" narrative is one of Bitcoin's main value propositions. It's not trying to replace cash for daily purchases (though it can be used that way). It's trying to be a better way to save and store value.

This is why many people buy Bitcoin as a long-term investment. They're not trying to get rich quick - they're trying to preserve their wealth in an asset that can't be inflated away.`,
      questions: [
        {
          id: "e1-q1",
          type: "multiple-choice",
          question: "Why is Bitcoin called 'digital gold'?",
          options: ["It's yellow", "It shares properties with gold", "It's made of gold", "It's worthless"],
          correctAnswer: "It shares properties with gold",
        },
        {
          id: "e1-q2",
          type: "multiple-choice",
          question: "What advantage does Bitcoin have over gold?",
          options: ["It's heavier", "It's easier to send globally", "It's harder to store", "It's less valuable"],
          correctAnswer: "It's easier to send globally",
        },
        {
          id: "e1-q3",
          type: "true-false",
          question: "Bitcoin is trying to replace cash for daily purchases.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "economics-2",
      subject: "economics",
      title: "Supply and Scarcity",
      description: "Why Bitcoin's fixed supply matters",
      difficulty: "beginner",
      readingContent: `# Supply and Scarcity

Bitcoin's supply is fixed at 21 million. This is hardcoded into the protocol. No one can change it without breaking Bitcoin's consensus rules.

This fixed supply creates scarcity. As demand increases but supply stays the same, price tends to increase. This is basic economics - supply and demand.

Compare this to fiat money. Governments can print as much as they want. This causes inflation - your money buys less over time. Bitcoin's fixed supply means it can't be inflated away.

The supply schedule is predictable. We know exactly how many Bitcoins will exist at any point in time. The last Bitcoin will be mined around 2140. After that, no new Bitcoins will ever be created.

This predictability is valuable. You can't be surprised by sudden supply increases. You know the rules and they won't change.

Scarcity alone doesn't create value - there has to be demand. But Bitcoin's fixed supply combined with growing demand creates a powerful economic dynamic that many find attractive.`,
      questions: [
        {
          id: "e2-q1",
          type: "multiple-choice",
          question: "What is Bitcoin's maximum supply?",
          options: ["10 million", "21 million", "50 million", "Unlimited"],
          correctAnswer: "21 million",
        },
        {
          id: "e2-q2",
          type: "true-false",
          question: "Governments can print unlimited Bitcoin.",
          correctAnswer: false,
        },
        {
          id: "e2-q3",
          type: "multiple-choice",
          question: "What happens when supply is fixed but demand increases?",
          options: ["Price decreases", "Price increases", "Nothing", "Supply increases"],
          correctAnswer: "Price increases",
        },
      ],
    },
    {
      id: "economics-3",
      subject: "economics",
      title: "Inflation vs Deflation",
      description: "Understanding monetary properties",
      difficulty: "intermediate",
      readingContent: `# Inflation vs Deflation

Inflation is when money loses value over time. A dollar today buys less than a dollar yesterday. This happens when governments print too much money.

Deflation is when money gains value over time. A Bitcoin today might buy more tomorrow. This happens with Bitcoin because supply is fixed but adoption grows.

Inflation encourages spending. Why save money that's losing value? Better to spend it now. Deflation encourages saving. Why spend Bitcoin that might be worth more later? Better to save it.

Critics say Bitcoin's deflationary nature makes it a poor currency - people won't spend it. Supporters say this is a feature, not a bug. It encourages saving and long-term thinking.

The truth is probably in between. Bitcoin might be better as a store of value (like gold) than as a daily currency. But the Lightning Network enables spending while still holding Bitcoin as savings.

Understanding inflation and deflation helps you understand why people choose Bitcoin over traditional money. In a world of constant inflation, a deflationary asset is attractive.`,
      questions: [
        {
          id: "e3-q1",
          type: "multiple-choice",
          question: "What is inflation?",
          options: ["Money gaining value", "Money losing value", "Money staying the same", "Creating new money"],
          correctAnswer: "Money losing value",
        },
        {
          id: "e3-q2",
          type: "multiple-choice",
          question: "What does deflation encourage?",
          options: ["Spending", "Saving", "Borrowing", "Lending"],
          correctAnswer: "Saving",
        },
        {
          id: "e3-q3",
          type: "true-false",
          question: "Bitcoin is inflationary like fiat money.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "economics-4",
      subject: "economics",
      title: "Network Effects",
      description: "Why Bitcoin becomes more valuable as it grows",
      difficulty: "intermediate",
      readingContent: `# Network Effects

Network effects mean a product becomes more valuable as more people use it. Bitcoin has strong network effects.

More users mean more liquidity (easier to buy and sell), more merchants accepting it, more infrastructure (exchanges, wallets, services), and more understanding. Each makes Bitcoin more useful.

This creates a positive feedback loop. More adoption → more value → more adoption → more value. This is why early adopters often see significant gains - they're getting in before the network effects fully kick in.

Compare to a social network. A social network with 10 users isn't very useful. One with a billion users is incredibly useful. Bitcoin is similar - it's more useful the more people use it.

Network effects also create switching costs. Once Bitcoin has enough adoption, it becomes hard for competitors to catch up. The network itself becomes a moat.

This is why Bitcoin's first-mover advantage is so powerful. Even if a "better" cryptocurrency is created, Bitcoin's network effects make it hard to displace.`,
      questions: [
        {
          id: "e4-q1",
          type: "multiple-choice",
          question: "What are network effects?",
          options: ["A product becomes less valuable with more users", "A product becomes more valuable with more users", "Networks break easily", "Nothing important"],
          correctAnswer: "A product becomes more valuable with more users",
        },
        {
          id: "e4-q2",
          type: "true-false",
          question: "Bitcoin has weak network effects.",
          correctAnswer: false,
        },
        {
          id: "e4-q3",
          type: "multiple-choice",
          question: "What creates a positive feedback loop for Bitcoin?",
          options: ["More regulation", "More adoption leading to more value", "Less users", "Government bans"],
          correctAnswer: "More adoption leading to more value",
        },
      ],
    },
    {
      id: "economics-5",
      subject: "economics",
      title: "Bitcoin's Price Volatility",
      description: "Why Bitcoin's price swings so much",
      difficulty: "intermediate",
      readingContent: `# Bitcoin's Price Volatility

Bitcoin's price is extremely volatile. It can go up or down 10% in a single day. This makes it risky and exciting.

Why is it so volatile? Several reasons: small market size (compared to gold or stocks), speculation (people buying hoping to sell higher), lack of regulation (fewer stabilizing forces), and news events (regulatory announcements cause big swings).

Volatility works both ways. You can make a lot of money if you buy low and sell high. You can also lose a lot if you buy high and sell low.

For long-term holders, volatility matters less. If you're holding for years, daily price swings are just noise. But for traders, volatility is both opportunity and risk.

As Bitcoin matures and adoption grows, volatility should decrease. Larger markets are generally less volatile. But Bitcoin will likely always be more volatile than traditional assets.

Understanding volatility helps you make informed decisions. Don't invest more than you can afford to lose. Don't panic sell during dips. And don't FOMO buy during pumps.`,
      questions: [
        {
          id: "e5-q1",
          type: "multiple-choice",
          question: "What is volatility?",
          options: ["Price stability", "Large price swings", "No price changes", "Constant growth"],
          correctAnswer: "Large price swings",
        },
        {
          id: "e5-q2",
          type: "true-false",
          question: "Bitcoin's price is very stable.",
          correctAnswer: false,
        },
        {
          id: "e5-q3",
          type: "multiple-choice",
          question: "What should happen to volatility as Bitcoin matures?",
          options: ["Increase", "Decrease", "Stay the same", "Disappear"],
          correctAnswer: "Decrease",
        },
      ],
    },
    {
      id: "economics-6",
      subject: "economics",
      title: "Store of Value vs Medium of Exchange",
      description: "Bitcoin's dual roles",
      difficulty: "intermediate",
      readingContent: `# Store of Value vs Medium of Exchange

Money has three functions: store of value (saving), medium of exchange (spending), and unit of account (pricing). Bitcoin excels at the first, struggles with the second, and is working on the third.

As a store of value, Bitcoin is excellent. It can't be inflated, it's portable, it's divisible, and it's secure. Many people buy Bitcoin to save, not to spend.

As a medium of exchange, Bitcoin has challenges. The main blockchain is slow (10 minutes per confirmation) and expensive (high fees). This makes it impractical for buying coffee.

The Lightning Network solves this. It enables fast, cheap transactions, making Bitcoin usable as a medium of exchange. You can save on the main chain and spend on Lightning.

As a unit of account, Bitcoin is still developing. Few things are priced in Bitcoin. Most prices are still in fiat, with Bitcoin as the payment method.

The debate continues: should Bitcoin focus on being digital gold (store of value) or digital cash (medium of exchange)? The answer might be both - save on-chain, spend on Lightning.`,
      questions: [
        {
          id: "e6-q1",
          type: "multiple-choice",
          question: "What are the three functions of money?",
          options: ["Buy, sell, trade", "Store of value, medium of exchange, unit of account", "Save, spend, invest", "Gold, silver, Bitcoin"],
          correctAnswer: "Store of value, medium of exchange, unit of account",
        },
        {
          id: "e6-q2",
          type: "multiple-choice",
          question: "What does Bitcoin excel at?",
          options: ["Medium of exchange", "Store of value", "Unit of account", "Nothing"],
          correctAnswer: "Store of value",
        },
        {
          id: "e6-q3",
          type: "true-false",
          question: "The Lightning Network makes Bitcoin usable for daily spending.",
          correctAnswer: true,
        },
      ],
    },
    {
      id: "economics-7",
      subject: "economics",
      title: "Bitcoin and Hyperinflation",
      description: "Bitcoin as protection against currency collapse",
      difficulty: "intermediate",
      readingContent: `# Bitcoin and Hyperinflation

Hyperinflation is when a currency loses value extremely rapidly. Prices can double in days or weeks. Savings become worthless. This has happened in countries like Zimbabwe, Venezuela, and Weimar Germany.

Bitcoin offers protection against hyperinflation. If your country's currency collapses, your Bitcoin (stored on the blockchain, not in a bank) still has value. You can't be cut off from it.

This is why Bitcoin adoption is often highest in countries with unstable currencies or capital controls. People use Bitcoin to protect their wealth from their government's monetary policy.

However, Bitcoin isn't a perfect solution. It's volatile, which can be scary during a crisis. It requires internet access and technical knowledge. And governments might try to ban it.

But for many people, the risk of Bitcoin volatility is better than the certainty of hyperinflation. At least with Bitcoin, there's a chance your savings survive.

This use case shows Bitcoin's value proposition: it's money that no government can inflate away. In a world where many currencies are unstable, this is powerful.`,
      questions: [
        {
          id: "e7-q1",
          type: "multiple-choice",
          question: "What is hyperinflation?",
          options: ["Slow price increases", "Extremely rapid currency devaluation", "Price stability", "Deflation"],
          correctAnswer: "Extremely rapid currency devaluation",
        },
        {
          id: "e7-q2",
          type: "multiple-choice",
          question: "Where is Bitcoin adoption often highest?",
          options: ["Stable countries", "Countries with unstable currencies", "Countries that ban it", "Nowhere"],
          correctAnswer: "Countries with unstable currencies",
        },
        {
          id: "e7-q3",
          type: "true-false",
          question: "Bitcoin can be inflated away by governments.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "economics-8",
      subject: "economics",
      title: "The Stock-to-Flow Model",
      description: "A model for understanding Bitcoin's value",
      difficulty: "advanced",
      readingContent: `# The Stock-to-Flow Model

Stock-to-flow is a model that attempts to predict Bitcoin's price based on its scarcity. It compares existing supply (stock) to new supply (flow).

Bitcoin has a high stock-to-flow ratio. There are many Bitcoins in existence (stock), but few new ones created each year (flow). This makes it scarce.

The model suggests that as Bitcoin's stock-to-flow ratio increases (due to halvings reducing flow), its price should increase. It's been somewhat accurate historically, though past performance doesn't guarantee future results.

The model is controversial. Critics say it's too simple and doesn't account for demand, regulation, or other factors. Supporters say it captures something fundamental about scarcity and value.

Regardless of whether the model is accurate, it highlights an important point: Bitcoin's scarcity is increasing over time. Each halving reduces the flow of new Bitcoins, making existing ones relatively scarcer.

This is one way people think about Bitcoin's long-term value proposition. As supply growth slows, demand growth (if it continues) should push prices higher.`,
      questions: [
        {
          id: "e8-q1",
          type: "multiple-choice",
          question: "What does stock-to-flow compare?",
          options: ["Price and volume", "Existing supply and new supply", "Buyers and sellers", "Mining and trading"],
          correctAnswer: "Existing supply and new supply",
        },
        {
          id: "e8-q2",
          type: "true-false",
          question: "The stock-to-flow model is universally accepted.",
          correctAnswer: false,
        },
        {
          id: "e8-q3",
          type: "multiple-choice",
          question: "What happens to Bitcoin's stock-to-flow ratio after halvings?",
          options: ["Decreases", "Increases", "Stays the same", "Disappears"],
          correctAnswer: "Increases",
        },
      ],
    },
    {
      id: "economics-9",
      subject: "economics",
      title: "Bitcoin vs Traditional Assets",
      description: "How Bitcoin compares to stocks, bonds, and gold",
      difficulty: "intermediate",
      readingContent: `# Bitcoin vs Traditional Assets

Bitcoin is often compared to traditional assets like stocks, bonds, and gold. Understanding the differences helps you make informed investment decisions.

Stocks represent ownership in companies. They can pay dividends and grow with the company. Bitcoin doesn't pay dividends - its value comes from adoption and scarcity.

Bonds are loans to governments or companies. They pay interest but are subject to inflation risk. Bitcoin pays no interest but can't be inflated.

Gold is a physical store of value. It's been used for thousands of years. Bitcoin is digital and much newer, but more portable and divisible.

Bitcoin is more volatile than all of these. It can swing wildly in short periods. This makes it riskier but also potentially more rewarding.

Many investors add Bitcoin to their portfolios for diversification. It doesn't correlate strongly with traditional assets, so it can provide protection when stocks fall.

The key is understanding what you're buying. Bitcoin isn't a stock (no company), isn't a bond (no interest), and isn't exactly like gold (it's digital). It's something new.`,
      questions: [
        {
          id: "e9-q1",
          type: "multiple-choice",
          question: "What do stocks represent?",
          options: ["Government debt", "Ownership in companies", "Physical gold", "Digital currency"],
          correctAnswer: "Ownership in companies",
        },
        {
          id: "e9-q2",
          type: "true-false",
          question: "Bitcoin pays dividends like stocks.",
          correctAnswer: false,
        },
        {
          id: "e9-q3",
          type: "multiple-choice",
          question: "Why do investors add Bitcoin to portfolios?",
          options: ["For dividends", "For diversification", "For stability", "For government backing"],
          correctAnswer: "For diversification",
        },
      ],
    },
    {
      id: "economics-10",
      subject: "economics",
      title: "Adoption Curves",
      description: "How new technologies spread",
      difficulty: "intermediate",
      readingContent: `# Adoption Curves

New technologies follow adoption curves. Early adopters try it first, then early majority, late majority, and finally laggards. Bitcoin is somewhere on this curve.

Early Bitcoin adopters were tech-savvy and risk-tolerant. They understood the technology and were willing to take a chance. Many became wealthy as adoption grew.

We're now seeing early majority adoption. Big companies are buying Bitcoin. Countries are making it legal tender. It's becoming mainstream.

The question is: how far along the curve are we? If we're early, there's huge upside potential. If we're late, most gains are behind us.

Adoption curves aren't smooth. There are booms and busts. Bitcoin has had several cycles of adoption and correction. Each cycle brings more users and infrastructure.

Understanding adoption curves helps you think about Bitcoin's future. If adoption continues, early adopters benefit. If it stalls, everyone suffers. The key is being honest about where we are.`,
      questions: [
        {
          id: "e10-q1",
          type: "multiple-choice",
          question: "Who are early adopters?",
          options: ["People who never adopt", "Tech-savvy risk-takers", "Only governments", "Only companies"],
          correctAnswer: "Tech-savvy risk-takers",
        },
        {
          id: "e10-q2",
          type: "true-false",
          question: "Adoption curves are always smooth and predictable.",
          correctAnswer: false,
        },
        {
          id: "e10-q3",
          type: "multiple-choice",
          question: "What stage is Bitcoin likely in now?",
          options: ["Not started", "Early adoption", "Early majority", "Complete"],
          correctAnswer: "Early majority",
        },
      ],
    },
    {
      id: "economics-11",
      subject: "economics",
      title: "Bitcoin's Economic Impact",
      description: "How Bitcoin affects the global economy",
      difficulty: "advanced",
      readingContent: `# Bitcoin's Economic Impact

Bitcoin's economic impact is still unfolding. It's too early to know the full effects, but we can see some trends.

Bitcoin provides an alternative to traditional banking. People in countries with poor banking can access financial services. People facing capital controls can move value across borders.

It's creating new industries. Mining, exchanges, wallet companies, payment processors - all built around Bitcoin. These create jobs and economic activity.

It's also disrupting existing industries. Traditional remittance companies face competition from Bitcoin. Banks see a threat to their business model.

Bitcoin affects monetary policy. Central banks can't control Bitcoin's supply. This limits their power. Some see this as good (less government control), others as bad (less ability to manage economies).

The full impact will take decades to understand. But it's clear that Bitcoin is already changing how people think about money, value, and financial sovereignty.

Whether this is positive or negative depends on your perspective. But it's undeniable that Bitcoin is having an economic impact.`,
      questions: [
        {
          id: "e11-q1",
          type: "multiple-choice",
          question: "What does Bitcoin provide an alternative to?",
          options: ["Food", "Traditional banking", "Transportation", "Entertainment"],
          correctAnswer: "Traditional banking",
        },
        {
          id: "e11-q2",
          type: "true-false",
          question: "Central banks can control Bitcoin's supply.",
          correctAnswer: false,
        },
        {
          id: "e11-q3",
          type: "multiple-choice",
          question: "What is Bitcoin's full economic impact?",
          options: ["Fully known", "Still unfolding", "None", "Negative only"],
          correctAnswer: "Still unfolding",
        },
      ],
    },
    {
      id: "economics-12",
      subject: "economics",
      title: "The Future of Money",
      description: "Bitcoin's role in the monetary system",
      difficulty: "advanced",
      readingContent: `# The Future of Money

What is the future of money? Bitcoin offers one vision: decentralized, digital, scarce money that no one controls.

This challenges the current system where governments and banks control money. Bitcoin suggests a future where individuals have more control, where money can't be inflated away, and where financial access is global.

But Bitcoin faces challenges. It's volatile, uses energy, and requires technical knowledge. These limit its adoption. The Lightning Network and other improvements address some issues, but not all.

The future might be a mix. Traditional money for daily use, Bitcoin for savings. Or maybe Bitcoin becomes the base layer, with stablecoins and other assets built on top.

Central bank digital currencies (CBDCs) are governments' response. They want digital money but with control. This creates a tension: decentralized Bitcoin vs. centralized CBDCs.

The future is uncertain. But Bitcoin has started a conversation that won't end. The question of who should control money is now on the table, and it's not going away.

Whether Bitcoin succeeds or fails, it has changed how we think about money. That alone is significant.`,
      questions: [
        {
          id: "e12-q1",
          type: "multiple-choice",
          question: "What does Bitcoin challenge?",
          options: ["The internet", "Government and bank control of money", "Computers", "Nothing"],
          correctAnswer: "Government and bank control of money",
        },
        {
          id: "e12-q2",
          type: "multiple-choice",
          question: "What are CBDCs?",
          options: ["A type of Bitcoin", "Central bank digital currencies", "Cryptocurrency exchanges", "Mining pools"],
          correctAnswer: "Central bank digital currencies",
        },
        {
          id: "e12-q3",
          type: "true-false",
          question: "The future of money is completely certain.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "economics-13",
      subject: "economics",
      title: "Monetary Policy and Central Banking",
      description: "How Bitcoin challenges traditional monetary control",
      difficulty: "intermediate",
      readingContent: `# Monetary Policy and Central Banking

Central banks control traditional money. They set interest rates, print money, and manage inflation. This gives them enormous power over economies.

Bitcoin challenges this model. No central bank controls Bitcoin. Its supply is fixed by code, not by committee. Interest rates don't apply - there's no borrowing or lending in the protocol itself.

This creates a fundamental tension. Central banks see Bitcoin as a threat to their monetary policy tools. They can't lower interest rates to stimulate Bitcoin adoption. They can't print more Bitcoin to fight deflation.

Bitcoin supporters see this as a feature. They argue that central banks have too much power and have made mistakes (hyperinflation, financial crises). Bitcoin removes that power.

The debate is ongoing. Can economies function without central bank control? Or do we need central banks to manage crises and smooth economic cycles?

Bitcoin doesn't answer these questions - it just provides an alternative. People can choose: trust central banks or trust code. This choice itself is revolutionary.`,
      questions: [
        {
          id: "e13-q1",
          type: "multiple-choice",
          question: "Who controls Bitcoin's supply?",
          options: ["Central banks", "Governments", "Code/protocol", "Exchanges"],
          correctAnswer: "Code/protocol",
        },
        {
          id: "e13-q2",
          type: "multiple-choice",
          question: "What do central banks control?",
          options: ["Bitcoin", "Interest rates and money printing", "Nothing", "The internet"],
          correctAnswer: "Interest rates and money printing",
        },
        {
          id: "e13-q3",
          type: "true-false",
          question: "Bitcoin can be controlled by central banks.",
          correctAnswer: false,
        },
        {
          id: "e13-q4",
          type: "multiple-choice",
          question: "What does Bitcoin provide an alternative to?",
          options: ["Food", "Central bank control of money", "Transportation", "Entertainment"],
          correctAnswer: "Central bank control of money",
        },
      ],
    },
    {
      id: "economics-14",
      subject: "economics",
      title: "The Halving Cycle Economics",
      description: "How halvings affect Bitcoin's economics",
      difficulty: "intermediate",
      readingContent: `# The Halving Cycle Economics

Bitcoin halvings reduce the block reward by 50% every four years. This has profound economic effects that create predictable cycles.

Before a halving, miners earn more Bitcoin. After a halving, they earn less. This changes mining economics. Less efficient miners shut down. Only the most efficient operations survive.

The reduced supply of new Bitcoin (flow) relative to existing Bitcoin (stock) increases scarcity. If demand stays the same or grows, prices tend to rise.

Historically, Bitcoin's price has increased significantly in the 12-18 months following halvings. This creates a pattern: halving → reduced supply → price increase → more adoption → price increase further.

But halvings also create uncertainty. Will miners continue operating with lower rewards? Will the network remain secure? So far, the answer has been yes, but it's not guaranteed.

The halving cycle creates a rhythm to Bitcoin's economics. Every four years, the supply shock creates new dynamics. Understanding this cycle helps you understand Bitcoin's long-term economics.

As we approach the final halvings (the last Bitcoin will be mined around 2140), the economics will shift further. Block rewards will become negligible, and transaction fees will become miners' primary income.`,
      questions: [
        {
          id: "e14-q1",
          type: "multiple-choice",
          question: "What happens to block rewards during a halving?",
          options: ["They double", "They're cut in half", "They stay the same", "They disappear"],
          correctAnswer: "They're cut in half",
        },
        {
          id: "e14-q2",
          type: "multiple-choice",
          question: "How often do Bitcoin halvings occur?",
          options: ["Every year", "Every two years", "Every four years", "Every ten years"],
          correctAnswer: "Every four years",
        },
        {
          id: "e14-q3",
          type: "true-false",
          question: "Historically, Bitcoin's price has increased after halvings.",
          correctAnswer: true,
        },
        {
          id: "e14-q4",
          type: "multiple-choice",
          question: "What will become miners' primary income after all Bitcoins are mined?",
          options: ["Block rewards", "Transaction fees", "Government subsidies", "Nothing"],
          correctAnswer: "Transaction fees",
        },
      ],
    },
    {
      id: "economics-15",
      subject: "economics",
      title: "Bitcoin as a Hedge",
      description: "Protecting wealth in uncertain times",
      difficulty: "intermediate",
      readingContent: `# Bitcoin as a Hedge

A hedge is an investment that protects against losses in other investments. Bitcoin is increasingly seen as a hedge against various risks.

Bitcoin hedges against inflation. When governments print money, fiat currencies lose value. Bitcoin's fixed supply means it can't be inflated. Many investors buy Bitcoin to protect against currency debasement.

Bitcoin hedges against economic collapse. If traditional financial systems fail, Bitcoin (stored on a decentralized network) might still function. This makes it attractive during crises.

Bitcoin hedges against government overreach. If governments freeze bank accounts or impose capital controls, Bitcoin (if properly stored) can't be frozen. This appeals to those worried about financial freedom.

However, Bitcoin is volatile. It can lose value even when other assets are stable. This makes it an imperfect hedge - it protects against some risks but introduces others.

The key is understanding what you're hedging against. If you're worried about inflation, Bitcoin might help. If you're worried about short-term volatility, Bitcoin might not be the answer.

Many investors allocate a small portion (1-5%) of their portfolio to Bitcoin as a hedge. This provides exposure without taking excessive risk.`,
      questions: [
        {
          id: "e15-q1",
          type: "multiple-choice",
          question: "What is a hedge?",
          options: ["A type of wallet", "An investment that protects against losses", "A mining pool", "An exchange"],
          correctAnswer: "An investment that protects against losses",
        },
        {
          id: "e15-q2",
          type: "multiple-choice",
          question: "What does Bitcoin hedge against?",
          options: ["Volatility", "Inflation and economic collapse", "Gains", "Nothing"],
          correctAnswer: "Inflation and economic collapse",
        },
        {
          id: "e15-q3",
          type: "true-false",
          question: "Bitcoin is a perfect hedge with no risks.",
          correctAnswer: false,
        },
        {
          id: "e15-q4",
          type: "multiple-choice",
          question: "What percentage of a portfolio do many investors allocate to Bitcoin?",
          options: ["50-100%", "1-5%", "0%", "100%"],
          correctAnswer: "1-5%",
        },
      ],
    },
    {
      id: "economics-16",
      subject: "economics",
      title: "Bitcoin and Remittances",
      description: "Sending money across borders cheaply",
      difficulty: "intermediate",
      readingContent: `# Bitcoin and Remittances

Remittances are money sent by workers in one country to their families in another. It's a huge market - hundreds of billions of dollars annually.

Traditional remittance services (like Western Union) charge high fees - often 10-20% of the amount sent. This is expensive for people who are often sending money they can't afford to lose.

Bitcoin offers a cheaper alternative. You can send Bitcoin across borders for minimal fees. The recipient can then convert it to local currency. Even with conversion fees, it's often cheaper than traditional services.

The Lightning Network makes this even better. Lightning transactions are nearly instant and cost fractions of a cent. This makes Bitcoin remittances fast and cheap.

However, there are challenges. Both sender and recipient need internet access and some technical knowledge. Bitcoin's volatility can be a problem if not converted quickly. And regulations vary by country.

Despite challenges, Bitcoin remittances are growing. Services are making it easier. Apps allow sending Bitcoin via Lightning with simple interfaces. This is bringing Bitcoin's benefits to people who need them most.

Bitcoin remittances show Bitcoin's real-world utility. It's not just speculation - it's solving real problems for real people.`,
      questions: [
        {
          id: "e16-q1",
          type: "multiple-choice",
          question: "What are remittances?",
          options: ["Mining rewards", "Money sent across borders", "Transaction fees", "Block rewards"],
          correctAnswer: "Money sent across borders",
        },
        {
          id: "e16-q2",
          type: "multiple-choice",
          question: "What fees do traditional remittance services charge?",
          options: ["1-2%", "10-20%", "50%", "Free"],
          correctAnswer: "10-20%",
        },
        {
          id: "e16-q3",
          type: "true-false",
          question: "The Lightning Network makes Bitcoin remittances faster and cheaper.",
          correctAnswer: true,
        },
        {
          id: "e16-q4",
          type: "multiple-choice",
          question: "What is a challenge with Bitcoin remittances?",
          options: ["Too cheap", "Need for internet and technical knowledge", "Too fast", "Too secure"],
          correctAnswer: "Need for internet and technical knowledge",
        },
      ],
    },
    {
      id: "economics-17",
      subject: "economics",
      title: "The Velocity of Money",
      description: "How fast money moves through the economy",
      difficulty: "advanced",
      readingContent: `# The Velocity of Money

Velocity of money measures how quickly money changes hands. High velocity means money is spent frequently. Low velocity means money is held (hoarded).

Bitcoin has low velocity. People tend to hold it rather than spend it. This is because of its deflationary nature - why spend something that might be worth more tomorrow?

Low velocity can be a problem for a currency. If no one spends it, it's not very useful as a medium of exchange. This is one criticism of Bitcoin.

However, the Lightning Network changes this. On Lightning, Bitcoin can have high velocity - people can spend it frequently for small transactions while still holding it on the main chain.

The main chain (where Bitcoin is held) has low velocity. The Lightning Network (where Bitcoin is spent) has high velocity. This dual nature might be Bitcoin's solution.

Traditional economists worry about low velocity. But Bitcoin supporters argue that low velocity on the base layer is fine if Lightning provides high velocity for spending.

The debate continues. Can a currency function with low base-layer velocity? Or does Bitcoin need to increase its spending velocity to be truly useful? Time will tell.`,
      questions: [
        {
          id: "e17-q1",
          type: "multiple-choice",
          question: "What is velocity of money?",
          options: ["How fast money is printed", "How quickly money changes hands", "How much money exists", "How expensive money is"],
          correctAnswer: "How quickly money changes hands",
        },
        {
          id: "e17-q2",
          type: "multiple-choice",
          question: "What is Bitcoin's velocity on the main chain?",
          options: ["High", "Low", "Medium", "Zero"],
          correctAnswer: "Low",
        },
        {
          id: "e17-q3",
          type: "true-false",
          question: "The Lightning Network can increase Bitcoin's spending velocity.",
          correctAnswer: true,
        },
        {
          id: "e17-q4",
          type: "multiple-choice",
          question: "Why do people tend to hold Bitcoin rather than spend it?",
          options: ["It's too expensive", "It's deflationary - might be worth more later", "It's illegal", "It's too fast"],
          correctAnswer: "It's deflationary - might be worth more later",
        },
      ],
    },
    {
      id: "economics-18",
      subject: "economics",
      title: "Bitcoin's Market Cap and Valuation",
      description: "Understanding Bitcoin's total value",
      difficulty: "intermediate",
      readingContent: `# Bitcoin's Market Cap and Valuation

Market capitalization (market cap) is the total value of all Bitcoin in existence. It's calculated by multiplying the current price by the total supply.

Bitcoin's market cap has grown from zero to over a trillion dollars. This makes it one of the largest assets in the world, comparable to major companies or gold.

Market cap matters because it shows Bitcoin's scale. A larger market cap means more value is stored in Bitcoin, more people own it, and it's harder to manipulate.

However, market cap can be misleading. Not all Bitcoin is actively traded. Much of it is held long-term (HODLing). The actual liquid supply is smaller.

Bitcoin's market cap is often compared to gold's. Gold has a market cap of trillions. If Bitcoin reaches similar adoption, its market cap could grow significantly.

Valuation models try to predict Bitcoin's future price. The stock-to-flow model is one example. But all models are imperfect - Bitcoin's value ultimately depends on adoption and demand.

Understanding market cap helps you understand Bitcoin's place in the global economy. It's no longer a small experiment - it's a major asset class.`,
      questions: [
        {
          id: "e18-q1",
          type: "multiple-choice",
          question: "What is market capitalization?",
          options: ["The number of Bitcoins", "Total value of all Bitcoin", "Transaction fees", "Mining rewards"],
          correctAnswer: "Total value of all Bitcoin",
        },
        {
          id: "e18-q2",
          type: "multiple-choice",
          question: "How is market cap calculated?",
          options: ["Price × Supply", "Price ÷ Supply", "Price + Supply", "Price - Supply"],
          correctAnswer: "Price × Supply",
        },
        {
          id: "e18-q3",
          type: "true-false",
          question: "Bitcoin's market cap is larger than gold's.",
          correctAnswer: false,
        },
        {
          id: "e18-q4",
          type: "multiple-choice",
          question: "What does Bitcoin's market cap show?",
          options: ["Nothing", "Bitcoin's scale and adoption", "Only the price", "Only the supply"],
          correctAnswer: "Bitcoin's scale and adoption",
        },
      ],
    },
    {
      id: "economics-19",
      subject: "economics",
      title: "Bitcoin and Taxation",
      description: "How governments tax Bitcoin",
      difficulty: "intermediate",
      readingContent: `# Bitcoin and Taxation

Governments tax Bitcoin, but the rules vary by country and are constantly evolving. Understanding taxation is important for Bitcoin users.

In many countries, Bitcoin is treated as property (like stocks or real estate), not currency. This means buying and selling Bitcoin can create taxable events.

If you buy Bitcoin and sell it for more than you paid, you have a capital gain and owe taxes. If you sell for less, you have a capital loss that might reduce your taxes.

Spending Bitcoin can also be a taxable event. If you buy something with Bitcoin that has increased in value, you might owe taxes on the gain.

Some countries tax Bitcoin mining as income. Others tax it differently. The rules are complex and changing.

Tax evasion is illegal. Trying to hide Bitcoin from tax authorities can result in serious penalties. It's important to comply with your country's tax laws.

However, Bitcoin's pseudonymous nature makes enforcement difficult. Governments are working on better tracking methods, but Bitcoin's privacy features make this challenging.

The best approach: understand your local tax laws, keep records of your Bitcoin transactions, and consult a tax professional if needed. Bitcoin doesn't mean you can ignore taxes.`,
      questions: [
        {
          id: "e19-q1",
          type: "multiple-choice",
          question: "How is Bitcoin often treated for tax purposes?",
          options: ["As currency", "As property", "As not taxable", "As illegal"],
          correctAnswer: "As property",
        },
        {
          id: "e19-q2",
          type: "true-false",
          question: "Spending Bitcoin can be a taxable event.",
          correctAnswer: true,
        },
        {
          id: "e19-q3",
          type: "multiple-choice",
          question: "What should you do regarding Bitcoin and taxes?",
          options: ["Ignore taxes", "Understand local laws and keep records", "Hide all Bitcoin", "Never sell Bitcoin"],
          correctAnswer: "Understand local laws and keep records",
        },
        {
          id: "e19-q4",
          type: "true-false",
          question: "Bitcoin makes tax evasion legal.",
          correctAnswer: false,
        },
      ],
    },
    {
      id: "economics-20",
      subject: "economics",
      title: "Bitcoin vs Fiat Currencies",
      description: "Comparing Bitcoin to traditional money",
      difficulty: "intermediate",
      readingContent: `# Bitcoin vs Fiat Currencies

Fiat currencies (dollars, euros, yen) are government-issued money with no intrinsic value. They're valuable because governments say they are and people accept them.

Bitcoin is different. It's not issued by any government. Its value comes from code, scarcity, and adoption. No one can force you to accept it, but no one can stop you from using it.

Fiat currencies can be printed infinitely. Governments create more when they need to. This causes inflation. Bitcoin has a fixed supply - no one can create more.

Fiat currencies require banks. You need a bank account to use them digitally. Bitcoin doesn't require banks - you can hold it yourself and send it peer-to-peer.

Fiat currencies are controlled by central banks. They set interest rates and manage supply. Bitcoin is controlled by code and consensus - no central authority.

Fiat currencies work within borders. International transfers are slow and expensive. Bitcoin works globally - same speed and cost whether sending next door or across the world.

The question is: which is better? The answer depends on what you value. Fiat offers stability and government backing. Bitcoin offers freedom and scarcity. Many people want both - fiat for stability, Bitcoin for freedom.`,
      questions: [
        {
          id: "e20-q1",
          type: "multiple-choice",
          question: "What are fiat currencies?",
          options: ["Government-issued money", "Bitcoin", "Gold", "Cryptocurrencies"],
          correctAnswer: "Government-issued money",
        },
        {
          id: "e20-q2",
          type: "multiple-choice",
          question: "What is Bitcoin's supply?",
          options: ["Infinite", "Fixed at 21 million", "Controlled by governments", "Random"],
          correctAnswer: "Fixed at 21 million",
        },
        {
          id: "e20-q3",
          type: "true-false",
          question: "Bitcoin requires banks to use.",
          correctAnswer: false,
        },
        {
          id: "e20-q4",
          type: "multiple-choice",
          question: "What does Bitcoin offer that fiat doesn't?",
          options: ["Government backing", "Freedom and scarcity", "Stability", "Bank accounts"],
          correctAnswer: "Freedom and scarcity",
        },
      ],
    },
    {
      id: "economics-21",
      subject: "economics",
      title: "Portfolio Allocation Strategies",
      description: "How to include Bitcoin in your investment portfolio",
      difficulty: "advanced",
      readingContent: `# Portfolio Allocation Strategies

Adding Bitcoin to an investment portfolio requires careful consideration. How much should you allocate? What's the right strategy?

Conservative allocation: 1-3% of portfolio. This provides exposure to Bitcoin's potential upside while limiting risk. Suitable for risk-averse investors.

Moderate allocation: 3-10% of portfolio. This balances Bitcoin's potential with diversification. Many financial advisors suggest this range for those comfortable with volatility.

Aggressive allocation: 10%+ of portfolio. This maximizes Bitcoin exposure but increases risk. Only suitable for those who can afford significant losses.

Dollar-cost averaging (DCA) is a popular strategy. Instead of buying all at once, you buy a fixed amount regularly (weekly, monthly). This reduces the impact of volatility and timing.

Rebalancing is important. If Bitcoin grows to 20% of your portfolio, you might sell some to maintain your target allocation. This locks in gains and maintains risk levels.

The right allocation depends on your risk tolerance, time horizon, and financial situation. Young investors with long time horizons might allocate more. Retirees might allocate less.

Remember: never invest more than you can afford to lose. Bitcoin is volatile and risky. But for many, a small allocation provides valuable diversification and upside potential.`,
      questions: [
        {
          id: "e21-q1",
          type: "multiple-choice",
          question: "What is a conservative Bitcoin allocation?",
          options: ["1-3%", "10-20%", "50%", "100%"],
          correctAnswer: "1-3%",
        },
        {
          id: "e21-q2",
          type: "multiple-choice",
          question: "What is dollar-cost averaging?",
          options: ["Buying all at once", "Buying a fixed amount regularly", "Never buying", "Selling everything"],
          correctAnswer: "Buying a fixed amount regularly",
        },
        {
          id: "e21-q3",
          type: "true-false",
          question: "You should invest more than you can afford to lose in Bitcoin.",
          correctAnswer: false,
        },
        {
          id: "e21-q4",
          type: "multiple-choice",
          question: "What does rebalancing do?",
          options: ["Increases risk", "Maintains target allocation and risk levels", "Eliminates gains", "Doubles your Bitcoin"],
          correctAnswer: "Maintains target allocation and risk levels",
        },
      ],
    },
  ];
};

