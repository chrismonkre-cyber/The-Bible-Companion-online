// Pre-loaded cache of the most common 100 Bible verses organized by topic/emotion
// This avoids API calls for the most frequently requested verses

export const VERSE_CACHE = {
  anxious: [
    { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    { reference: "Matthew 6:34", text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
    { reference: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
    { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
    { reference: "Psalm 94:19", text: "When anxiety was great within me, your consolation brought me joy." },
  ],
  worried: [
    { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    { reference: "Matthew 6:25", text: "Therefore I tell you, do not worry about your life, what you will eat or drink; or about your body, what you will wear. Is not life more than food, and the body more than clothes?" },
    { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
    { reference: "Psalm 55:22", text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken." },
  ],
  sad: [
    { reference: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    { reference: "Matthew 5:4", text: "Blessed are those who mourn, for they will be comforted." },
    { reference: "John 11:35", text: "Jesus wept." },
    { reference: "Psalm 30:5", text: "Weeping may stay for the night, but rejoicing comes in the morning." },
    { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  ],
  lonely: [
    { reference: "Deuteronomy 31:6", text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you." },
    { reference: "Hebrews 13:5", text: "Never will I leave you; never will I forsake you." },
    { reference: "Psalm 23:4", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
    { reference: "Isaiah 43:2", text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you." },
    { reference: "Matthew 28:20", text: "And surely I am with you always, to the very end of the age." },
  ],
  afraid: [
    { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
    { reference: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline." },
    { reference: "Psalm 27:1", text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?" },
    { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
    { reference: "Psalm 56:3", text: "When I am afraid, I put my trust in you." },
  ],
  hopeless: [
    { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { reference: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit." },
    { reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
    { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    { reference: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." },
  ],
  grateful: [
    { reference: "1 Thessalonians 5:18", text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus." },
    { reference: "Psalm 107:1", text: "Give thanks to the Lord, for he is good; his love endures forever." },
    { reference: "Colossians 3:17", text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him." },
    { reference: "Psalm 100:4", text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name." },
    { reference: "James 1:17", text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows." },
  ],
  joyful: [
    { reference: "Psalm 16:11", text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand." },
    { reference: "Nehemiah 8:10", text: "Do not grieve, for the joy of the Lord is your strength." },
    { reference: "Philippians 4:4", text: "Rejoice in the Lord always. I will say it again: Rejoice!" },
    { reference: "John 15:11", text: "I have told you this so that my joy may be in you and that your joy may be complete." },
    { reference: "Psalm 118:24", text: "The Lord has done it this very day; let us rejoice today and be glad." },
  ],
  lost: [
    { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { reference: "Psalm 32:8", text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you." },
    { reference: "Isaiah 30:21", text: "Whether you turn to the right or to the left, your ears will hear a voice behind you, saying, 'This is the way; walk in it.'" },
    { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { reference: "John 10:14", text: "I am the good shepherd; I know my sheep and my sheep know me." },
  ],
  overwhelmed: [
    { reference: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light." },
    { reference: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." },
    { reference: "2 Corinthians 4:17", text: "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all." },
    { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
    { reference: "Isaiah 40:29", text: "He gives strength to the weary and increases the power of the weak." },
  ],
  angry: [
    { reference: "Ephesians 4:26-27", text: "In your anger do not sin: Do not let the sun go down while you are still angry, and do not give the devil a foothold." },
    { reference: "James 1:19-20", text: "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires." },
    { reference: "Proverbs 15:1", text: "A gentle answer turns away wrath, but a harsh word stirs up anger." },
    { reference: "Psalm 37:8", text: "Refrain from anger and turn from wrath; do not fret—it leads only to evil." },
    { reference: "Colossians 3:13", text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you." },
  ],
  grieving: [
    { reference: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    { reference: "Revelation 21:4", text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away." },
    { reference: "2 Corinthians 1:3-4", text: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles." },
    { reference: "John 14:1", text: "Do not let your hearts be troubled. You believe in God; believe also in me." },
    { reference: "Romans 8:18", text: "I consider that our present sufferings are not worth comparing with the glory that will be revealed in us." },
  ],
  weak: [
    { reference: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me." },
    { reference: "Isaiah 40:29-31", text: "He gives strength to the weary and increases the power of the weak. Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength." },
    { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
    { reference: "Psalm 73:26", text: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever." },
    { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
  ],
  forgiveness: [
    { reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness." },
    { reference: "Colossians 2:13-14", text: "God made you alive with Christ. He forgave us all our sins, having canceled the charge of our legal indebtedness, which stood against us and condemned us; he has taken it away, nailing it to the cross." },
    { reference: "Micah 7:19", text: "You will again have compassion on us; you will tread our sins underfoot and hurl all our iniquities into the depths of the sea." },
    { reference: "Psalm 103:12", text: "As far as the east is from the west, so far has he removed our transgressions from us." },
    { reference: "Romans 8:1", text: "Therefore, there is now no condemnation for those who are in Christ Jesus." },
  ],
  peace: [
    { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." },
    { reference: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
    { reference: "Philippians 4:7", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    { reference: "Romans 5:1", text: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ." },
    { reference: "Numbers 6:24-26", text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace." },
  ],
  faith: [
    { reference: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see." },
    { reference: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ." },
    { reference: "Mark 9:23", text: "'If you can?' said Jesus. 'Everything is possible for one who believes.'" },
    { reference: "Matthew 17:20", text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you." },
    { reference: "Galatians 2:20", text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me." },
  ],
  love: [
    { reference: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres." },
    { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { reference: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." },
    { reference: "1 John 4:8", text: "Whoever does not love does not know God, because God is love." },
    { reference: "Zephaniah 3:17", text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing." },
  ],
  strength: [
    { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
    { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
    { reference: "Psalm 28:7", text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me." },
    { reference: "2 Corinthians 12:10", text: "That is why, for Christ's sake, I delight in weaknesses, in insults, in hardships, in persecutions, in difficulties. For when I am weak, then I am strong." },
  ],
  depressed: [
    { reference: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    { reference: "Isaiah 43:2", text: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze." },
    { reference: "Psalm 40:1-2", text: "I waited patiently for the Lord; he turned to me and heard my cry. He lifted me out of the slimy pit, out of the mud and mire; he set my feet on a rock and gave me a firm place to stand." },
    { reference: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord." },
    { reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
  ],
  hope: [
    { reference: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit." },
    { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." },
    { reference: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God." },
    { reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." },
  ],
};

// Reflections pre-loaded for each emotion category
export const REFLECTION_CACHE = {
  anxious: {
    reflection: "In the quiet moments when worry creeps in and the what-ifs seem to multiply, God invites you to bring every single concern to Him. Not just the big ones — all of them. He is not overwhelmed by your fears; He is moved by them.\n\nPhilippians 4:6 doesn't say \"don't worry\" without offering something in return. It offers the most extraordinary exchange: your anxiety for God's peace. A peace that doesn't make logical sense, yet settles over your heart like morning dew. You don't have to manufacture calm — you simply have to come to Him.\n\nToday, try naming each worry out loud to God as a prayer. Hand it to Him one by one, and receive in its place the peace that guards your heart.",
    encouragement: "You are not alone in your anxiety — God sees every worry, and His peace is already on its way to you."
  },
  sad: {
    reflection: "Grief and sadness are not signs of weak faith. Jesus wept at the tomb of Lazarus, even knowing what was about to happen. He wept because He loved, and love makes us tender.\n\nGod does not ask you to rush past your sadness or pretend it isn't real. He draws near to the brokenhearted — not to fix or silence, but to sit with you in it. The Psalms are filled with laments, with honest cries of pain poured out before a God who can hold it all.\n\nMorning is coming. It may not be today, but weeping does not have the final word. Joy is promised, and God is faithful to every promise He has ever made.",
    encouragement: "Your tears are not wasted — God catches every one, and He promises that joy is coming."
  },
  lonely: {
    reflection: "There is a particular ache in loneliness — a sense of being unseen, unknown, or forgotten. But God says something remarkable: \"Never will I leave you; never will I forsake you.\" Not sometimes. Never.\n\nYou carry the presence of the Living God with you everywhere. In the quiet apartment, in the crowded room where you still feel alone, in the late night when the world seems to sleep — He is there, fully present, entirely attentive to you.\n\nThis doesn't erase the human longing for connection, and that longing is good and worth pursuing. But you are never truly alone. You are known by name, held in love, and accompanied every step of the way.",
    encouragement: "The God of the universe knows your name and chooses to be with you — you are never truly alone."
  },
  hopeless: {
    reflection: "When hope feels gone, it can feel like God Himself has gone silent. But Jeremiah wrote his most famous promise — \"I know the plans I have for you\" — while the people of God were in exile, while everything looked bleak and broken. The promise was spoken into darkness, not into sunshine.\n\nHope in God is not a feeling; it is a posture. It is the decision to believe that God's story is not over, even when your chapter feels stuck. The same God who raised Jesus from the dead is working in your story.\n\nLet these words settle over you today: your future is not empty. It is held by the One who holds all things, and He has not forgotten you.",
    encouragement: "Your story is not over — God is writing the next chapter, and His plans for you are filled with hope."
  },
  hope: {
    reflection: "Hope is one of the most powerful gifts God gives us. Romans 15:13 reminds us that He is the very God of hope — hope is not just something He offers, it is part of His character and nature.\n\nWhen you feel hopeful, you are catching a glimpse of what God sees when He looks at your life. He sees a future full of purpose, a story still being written, a path lit by His faithful love. That sense of anticipation you carry is a holy thing — it is faith looking forward.\n\nLet hope grow in you today. Water it with the promises of Scripture and trust that the God who plants hope in your heart is the same God who delights to bring it to fullness.",
    encouragement: "The God of hope is filling you right now — let His joy and peace overflow into everything you do today."
  },
  overwhelmed: {
    reflection: "When everything piles up and breathing feels heavy, Jesus extends one of the most tender invitations in all of Scripture: \"Come to me.\" Not \"figure it out,\" not \"be stronger\" — simply, come.\n\nHis yoke is not another burden to carry. It is the gift of walking in step with Him, letting His rhythm and pace replace your frantic striving. He is gentle. He is humble. And He is not disappointed in your weakness.\n\nYou don't have to carry everything alone. In fact, you were never designed to. Lay down what is crushing you and pick up only what He places in your hands today.",
    encouragement: "You don't have to carry it all — Jesus invites you to bring your burdens to Him and find rest."
  },
  grateful: {
    reflection: "Gratitude has the remarkable power to shift our entire perspective. When we pause to name what is good, we train our hearts to see the fingerprints of God everywhere — in the small, the ordinary, the easily overlooked.\n\nEvery good gift comes from Him. The morning light, the breath in your lungs, the people you love, the grace that greets you new each morning. None of it is random; all of it is given.\n\nLet thanksgiving become a practice, a daily returning to wonder. The more you look for God's goodness, the more you will find it — in places you never expected.",
    encouragement: "Your grateful heart is a beautiful offering to God — keep looking for His goodness; you will always find it."
  },
};

// Find best matching cache entry for a given feeling string
export function findCachedResponse(feeling) {
  const f = feeling.toLowerCase();
  const keywords = {
    anxious: ['anxious', 'anxiety', 'nervous', 'panic', 'stress', 'stressed'],
    worried: ['worried', 'worry', 'concern', 'uncertain', 'unsure'],
    sad: ['sad', 'sadness', 'unhappy', 'down', 'blue', 'crying', 'tears', 'hurt'],
    lonely: ['lonely', 'alone', 'isolated', 'abandoned', 'forgotten'],
    afraid: ['afraid', 'fear', 'scared', 'terrified', 'frightened'],
    hopeless: ['hopeless', 'no hope', 'giving up', 'desperate', 'pointless'],
    grateful: ['grateful', 'thankful', 'blessed', 'thankfulness', 'gratitude'],
    joyful: ['joyful', 'happy', 'joy', 'excited', 'elated', 'wonderful'],
    lost: ['lost', 'direction', 'confused', 'purpose', 'meaning'],
    overwhelmed: ['overwhelmed', 'too much', 'burden', 'heavy', 'exhausted', 'tired', 'weary'],
    angry: ['angry', 'anger', 'mad', 'frustrated', 'rage', 'furious'],
    grieving: ['grieving', 'grief', 'loss', 'mourning', 'died', 'death'],
    weak: ['weak', 'weakness', 'powerless', 'fragile'],
    forgiveness: ['forgive', 'forgiveness', 'guilt', 'shame', 'regret', 'sin'],
    peace: ['peace', 'calm', 'rest', 'still', 'quiet'],
    faith: ['faith', 'believe', 'trust', 'doubt', 'doubting'],
    love: ['love', 'loved', 'caring', 'heart'],
    strength: ['strength', 'strong', 'courage', 'brave'],
    depressed: ['depressed', 'depression', 'dark', 'darkness', 'numb'],
    hope: ['hopeful', 'hope', 'hoping', 'optimistic', 'expectant'],
  };

  for (const [emotion, words] of Object.entries(keywords)) {
    if (words.some(w => f.includes(w))) {
      const verses = VERSE_CACHE[emotion];
      const cached = REFLECTION_CACHE[emotion];
      if (verses) {
        return {
          verses: verses.slice(0, 4),
          reflection: cached?.reflection || "God sees you in this moment and draws near to you with love and compassion. His word is a lamp to your feet, lighting the path ahead one step at a time.",
          encouragement: cached?.encouragement || "You are seen, known, and deeply loved by God — He is with you in this very moment.",
        };
      }
    }
  }
  return null;
}