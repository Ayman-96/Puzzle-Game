export const easyLevels = [
  {
    id: 1,
    number: "001",
    difficulty: "EASY",
    title: "THE NEIGHBOR",
    subTitle: "A letter was slipped under your door by mistake",
    emoji: "📬",
    case: `My dearest Margaret,\n
    I hope this letter finds you well. Life here has been peaceful, though I must admit the nights feel longer than I remember. I think of the house often — the garden, the kitchen, the way the light comes through the east window in the morning. I miss it deeply.\n
    Please do not worry about me. I am eating well and the people here are kind. James visits every Sunday without fail, which means the world to me. Tell him I said so, if you see him before I do.\n
    With all my love,\n Father`,
    question:
      "Something in this letter suggests the father did not write it willingly. What is it?",

    img: "",
    options: [
      {
        key: "A",
        text: "He misses the house too much which means he was forced to leave",
      },
      {
        key: "B",
        text: "He asks Margaret to tell James he visits — but if James visits him, he would tell James himself",
      },
      {
        key: "C",
        text: "He says the nights feel longer — a sign of fear or depression",
      },
      {
        key: "D",
        text: "He says the people are kind — he is trying to convince himself",
      },
    ],
    solution: "B",
    explanation:
      "He asks Margaret to tell James he visits every Sunday — but if James truly visits him, he would tell James himself. He wouldn't need Margaret as a messenger. James does not actually visit.",
    category: "contradiction",
    timeLimit: 60,
  },
  {
    id: 2,
    title: "THE NEW EMPLOYEE",
    subTitle: "Your first week at the company — something feels off",
    emoji: "🧑‍💼",
    question:
      "Based on the email chain, who is lying about the missed deadline?",
    case: `From: Daniel (Manager) → To: All Team
Monday, 9:14 AM

"Team, just a reminder that the Henderson report was due last Friday. We are still waiting on it. This delay is unacceptable and is affecting the entire department."

---

From: Sara → To: Daniel
Monday, 10:02 AM

"Daniel, I submitted my section to Mark last Thursday as agreed. I have the email confirmation if needed."

---

From: Mark → To: Daniel
Monday, 10:45 AM

"I never received anything from Sara. My section was completed and sent to you directly on Friday morning. The delay is not on my end."

---

From: Sara → To: Daniel
Monday, 11:03 AM

"Mark, you replied to my submission email on Thursday saying you received it. I still have that reply in my inbox."`,
    number: "002",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "Daniel — he knew about the delay but waited until Monday to address it",
      },
      {
        key: "B",
        text: "Mark — he claimed he never received Sara's section but his own reply proves he did",
      },
      {
        key: "C",
        text: "Sara — she submitted late and is covering it up with a fake confirmation",
      },
      { key: "D", text: "Both Sara and Mark are lying to protect each other" },
    ],
    solution: "B",
    explanation:
      "Mark claimed he never received Sara's submission — but Sara pointed out that Mark replied to her email confirming receipt. You can't reply to an email you never received. Mark's own action exposes his lie.",
    category: "contradiction",
    timeLimit: 60,
  },
  {
    id: 3,
    title: "THE DOCTOR",
    subTitle: "A patient's file landed on your desk this morning",
    emoji: "🩺",
    question:
      "What detail in this file suggests the prescription was not written by the listed doctor?",
    case: `Patient: Robert Hall — Age: 52
Admitted: Tuesday, 8:30 AM
Attending Physician: Dr. Elaine Morris

Diagnosis: Moderate hypertension, mild anxiety.

Prescription issued Tuesday 8:45 AM:
— Medication A: 10mg daily
— Medication B: 50mg twice daily

Physician notes:
"Patient is responding well. Continue current plan. Follow-up in two weeks."

---

Staff log note — Tuesday 9:10 AM:
"Dr. Morris called in sick this morning. Shift covered by Dr. James."`,
    number: "003",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "The medication dosage is too high for a patient his age",
      },
      {
        key: "B",
        text: "The prescription was issued at 8:45 AM but Dr. Morris called in sick that morning — she was never there",
      },
      {
        key: "C",
        text: "The diagnosis of anxiety and hypertension together is medically unusual",
      },
      {
        key: "D",
        text: "The follow-up period of two weeks is too short for this condition",
      },
    ],
    solution: "B",
    explanation:
      "The prescription was signed by Dr. Morris at 8:45 AM — but the staff log shows she called in sick that same morning and never came in. Someone else issued that prescription under her name.",
    category: "investigation",
    timeLimit: 60,
  },
  {
    id: 4,
    title: "THE JOURNALIST",
    subTitle: "An anonymous tip arrived in your inbox late last night",
    emoji: "📰",

    question:
      "What inconsistency in the Mayor's statement reveals he is not telling the truth?",
    case: `Anonymous tip received — Wednesday 11:58 PM:
"The Mayor approved the construction contract before the public vote. Check his own calendar."

---

Mayor's official statement — Thursday 10:00 AM:

"I want to be absolutely clear. The construction contract for the new district was approved only after the public vote on September 14th, as required by law. My office followed every procedure correctly and transparently. I did not sign anything before the community had their say. Any claims suggesting otherwise are completely false and politically motivated."

---

City records — obtained Thursday 2:00 PM:
Contract reference: CDX-2024
Signing date: September 11th
Signed by: Mayor's office`,
    number: "004",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "The anonymous tip was sent late at night which makes it unreliable",
      },
      {
        key: "B",
        text: "The Mayor used the phrase 'politically motivated' which is defensive language",
      },
      {
        key: "C",
        text: "The Mayor said approval came after September 14th — but city records show the contract was signed on September 11th, three days before",
      },
      {
        key: "D",
        text: "The city records could have been tampered with by political opponents",
      },
    ],
    solution: "C",
    explanation:
      "The Mayor specifically stated nothing was signed before the September 14th vote. The city records show the contract was signed on September 11th — three days before the vote. His own statement contradicts the official document.",
    category: "investigation",
    timeLimit: 60,
  },
  {
    id: 5,
    title: "THE FRIEND",
    subTitle:
      "Two of your closest friends had a falling out — both texted you their version",
    emoji: "🤝",
    question:
      "Whose story contains a detail that makes their version impossible?",
    case: `Message from Layla — Friday 9:45 PM:

"I can't believe Adam. We were at the restaurant together on Wednesday night. I told him about my job situation in confidence. The next morning my boss called me into his office — someone had told him everything. Adam is the only person who knew. He must have called my boss that same night after dinner."

---

Message from Adam — Friday 10:20 PM:

"Layla is completely wrong. Yes we had dinner Wednesday. But I would never do that to her. I got home, went straight to sleep — I had an early flight Thursday at 6 AM to visit my parents. I was at the airport by 4:30 AM. I had no time and no reason to call anyone that night."

---

Layla again — Friday 10:35 PM:

"He's lying. I saw him at the coffee shop near my office on Thursday afternoon. He was never on any flight."`,
    number: "005",
    difficulty: "Easy",
    options: [
      {
        key: "A",
        text: "Layla is lying — she has no proof Adam spoke to her boss",
      },
      {
        key: "B",
        text: "Adam is lying — if he had a 6 AM flight he would have left before the coffee shop opened",
      },
      {
        key: "C",
        text: "Adam is lying — Layla saw him at the coffee shop Thursday afternoon, which contradicts his claim of being away",
      },
      {
        key: "D",
        text: "Both are equally believable and there is not enough information to decide",
      },
    ],
    solution: "C",
    explanation:
      "Adam claimed he flew out Thursday at 6 AM to visit his parents — meaning he should have been away all day. But Layla saw him at the coffee shop near her office Thursday afternoon. He couldn't have been on a flight and in the city at the same time. His alibi falls apart.",
    category: "contradiction",
    timeLimit: 60,
  },
];

export const mediumLevels = [
  {
    id: 1,
    title: "THE TRAVEL COMPANION",
    subTitle: "Airport incident report",
    emoji: "✈️",
    question: "Which statement cannot be true?",
    case: `CASE FILE #013

Two friends, Daniel and Victor, reported a lost bag to airport
security after arriving from a short domestic flight.

Security asked both passengers to describe what happened.

––––––––––––––––––

Daniel's statement:

"We landed at 9:10 PM and waited about fifteen minutes at the
baggage carousel. When Victor realized his bag wasn't coming,
we went directly to the lost baggage desk. I remember the desk
agent mentioning they were about to close for the night."

––––––––––––––––––

Victor's statement:

"The plane landed just after nine. Daniel checked his phone and
said it was already 9:30 PM while we were still waiting for the
bags. When mine didn't appear, we walked over to the baggage
service desk to report it."

––––––––––––––––––

Airport Information Board:

Lost Baggage Service Desk Hours
Closing Time: 9:30 PM

––––––––––––––––––`,
    number: "001",
    img: "",
    solution: "B",
    explanation:
      "Victor claims they were still waiting at the baggage carousel at 9:30 PM. However, Daniel says they went to the baggage desk and the agent said they were about to close. Since the desk closes exactly at 9:30 PM, they could not still be waiting at the carousel at that time and then arrive before closing. Victor's timeline contradicts the desk hours.",
    options: [
      { key: "A", text: "Daniel's statement is impossible." },
      { key: "B", text: "Victor's statement is impossible." },
      { key: "C", text: "Both statements can be true." },
      { key: "D", text: "The airport board information must be incorrect." },
    ],
    category: "contradiction",
    difficulty: "Medium",
    timeLimit: 300,
  },
  {
    id: 2,
    title: "THE LIBRARIAN",
    subTitle: "After-hours library report",
    emoji: "📚",
    question: "Which student’s story doesn’t match the evidence?",
    case: `Three students were in the university library shortly before closing time when a laptop disappeared from a study table.

Each student explained where they were.

––––––––––––––––––

Evan's statement:

"I was printing my essay in the computer room. When I finished,
I walked straight out of the building because the closing bell
had already rung."

––––––––––––––––––

Nadia's statement:

"I was sitting near the history shelves reading. I heard the
closing bell while I was there and packed my things before
leaving."

––––––––––––––––––

Lucas's statement:

"I was still at my study table when the lights dimmed for
closing. That's when I noticed the laptop on the nearby desk
was already gone."

––––––––––––––––––

Library closing procedure notice:

At closing time, a bell rings first.
Five minutes later, the lights dim as the final warning.`,
    number: "002",
    img: "",
    solution: "A",
    explanation:
      "Evan claims the closing bell had already rung before he left the computer room. But if the bell had rung, the library would still be open for five more minutes before lights dim. Lucas says the lights dimmed while he was still there, meaning Evan couldn't have left immediately after the bell because the library wasn't closed yet.",
    options: [
      { key: "A", text: "Evan's statement is inconsistent." },
      { key: "B", text: "Nadia's statement is inconsistent." },
      { key: "C", text: "Lucas's statement is inconsistent." },
      { key: "D", text: "All stories could be true." },
    ],
    category: "investigation",
    difficulty: "Medium",
    timeLimit: 300,
  },
  {
    id: 3,
    title: "THE DELIVERY DRIVER",
    subTitle: "Package dispute email",
    emoji: "📦",
    question: "Which person’s claim cannot be correct?",
    case: `A delivery company is investigating a missing package.

Three people provided statements.

––––––––––––––––––

Driver – Miguel

"I delivered the package at 2:05 PM and left it with the
receptionist at the front desk."

––––––––––––––––––

Receptionist – Clara

"I stepped away from the desk around 2:00 PM to help someone
in the records room. I came back about ten minutes later."

––––––––––––––––––

Office Manager – Raj

"When I arrived at 2:07 PM, I saw a package sitting alone
on the front desk counter. No one else was there."

––––––––––––––––––

Security camera log:

Front desk camera recorded no staff present
between 2:00 PM and 2:09 PM.`,
    number: "003",
    img: "",
    solution: "A",
    explanation:
      "Miguel says he handed the package to the receptionist at 2:05 PM. But Clara was away from the desk from 2:00 to about 2:10 PM, and the camera log confirms no staff were present during that time. Therefore Miguel could not have handed it to her.",
    options: [
      { key: "A", text: "Miguel's statement cannot be correct." },
      { key: "B", text: "Clara's statement cannot be correct." },
      { key: "C", text: "Raj's statement cannot be correct." },
      { key: "D", text: "The security log must be wrong." },
    ],
    category: "contradiction",
    difficulty: "Medium",
    timeLimit: 300,
  },
  {
    id: 4,
    title: "THE PARK RANGER",
    subTitle: "Trail incident report",
    emoji: "🌲",
    question: "Which hiker's description is impossible?",
    case: `Three hikers reported seeing a missing backpack on the mountain trail.

Rangers compared their descriptions.

––––––––––––––––––

Hiker 1 – Elena

"I saw the backpack near the wooden bridge crossing the
stream. It was leaning against the railing."

––––––––––––––––––

Hiker 2 – Mark

"I noticed the backpack further up the trail beside a
large fallen pine tree."

––––––––––––––––––

Hiker 3 – Sophie

"I passed the wooden bridge first, then about ten minutes
later I saw a big fallen pine tree beside the trail. I
didn't see any backpack anywhere."

––––––––––––––––––

Trail map note:

The fallen pine tree lies before the wooden bridge when
walking from the trail entrance.`,
    number: "004",
    img: "",
    solution: "C",
    explanation:
      "The trail note says the fallen pine tree comes before the wooden bridge. Sophie claims she passed the bridge first and only later saw the fallen tree, which is impossible if she started from the entrance.",
    options: [
      { key: "A", text: "Elena's description is impossible." },
      { key: "B", text: "Mark's description is impossible." },
      { key: "C", text: "Sophie's description is impossible." },
      { key: "D", text: "All descriptions could be correct." },
    ],
    category: "map",
    difficulty: "Medium",
    timeLimit: 300,
  },
  {
    id: 5,
    number: "005",
    difficulty: "HARD",
    category: "map",
    title: "THE PARK RANGER",
    subTitle: "A frantic note recovered from an abandoned campsite",
    emoji: "🌲",
    case: `DAY 4 - If anyone finds this, listen closely. We left the base camp at dawn, heading exactly North toward the Devil’s Peak. By noon, the sun was high and beating down on us. I remember looking at the Old Oak tree at the clearing; its shadow was stretched out long, pointing directly toward the Silver River to our left, so we followed the water downstream to stay cool.

  We hiked for three hours with the river on our right side, moving East as the terrain flattened. The map says the Ranger Station is exactly 5 miles South of the Silver River bend. We turned away from the water when the sun began to set behind us, walking straight into the treeline. 

  But something is wrong. We’ve been walking for hours. The moss is growing on the South side of the trunks here, and the stars are out, but I can't find the North Star. If you're reading this, don't follow our tracks. The map is a lie, or the land has changed.`,

    question:
      "The Ranger realizes the hiker is hallucinating or lying. What is the primary geographical impossibility?",

    img: "",
    options: [
      {
        key: "A",
        text: "At noon in the northern hemisphere, shadows point North, not toward a river to the 'left' of someone facing North.",
      },
      {
        key: "B",
        text: "If they were heading East with the river on their right, they would be moving upstream, not downstream.",
      },
      {
        key: "C",
        text: "Moss only grows on the North side of trees; seeing it on the South side is a sign of a different climate.",
      },
      {
        key: "D",
        text: "You cannot see the sun set 'behind you' if you are walking East; the sun sets in the West.",
      },
    ],
    solution: "D",
    explanation:
      "This case has multiple layers of confusion (the 'Hard' element), but the absolute impossibility is the sunset. If they were walking East, the sun (which sets in the West) would be behind them. However, they say they 'turned away from the water... walking straight into the treeline' as the sun set behind them. If they turned South (away from the river) at sunset, the sun would be on their right, not behind them. Furthermore, shadows at noon are at their shortest, not 'stretched out long.'",
    timeLimit: 300,
  },
];
export const hardLevels = [
  {
    id: 1,
    title: "THE INVESTIGATOR",
    subTitle:
      "A corporate fraud case has landed on your desk — four departments, one thief",
    emoji: "🕵️",
    question: "Based on all the documents, who orchestrated the fraud?",
    case: `Internal Audit Report — Flagged for Investigation
Company: Meridian Holdings
Date: October 3rd

Summary:
Between July and September, a total of $180,000 was transferred in six separate transactions from the company's operational account to an external vendor account registered under the name "Veltro Supplies." Procurement has no record of ever approving or working with a vendor by this name.

---

Statement — Helen, CFO:
"I was made aware of the Veltro payments only when the audit flagged them last week. All payments above $10,000 require dual authorization — mine and the department head's. I do not recall authorizing any of these. My signature must have been forged or my credentials were used without my knowledge."

---

Statement — Marcus, Head of Procurement:
"Veltro Supplies does not exist in our approved vendor list. I never submitted or approved any request for this vendor. Procurement only processes vendors that go through a three-step verification. This bypassed our entire system entirely."

---

Statement — Diana, Head of Finance:
"Each of the six transactions was processed through our internal system under a temporary vendor exemption code. These codes are issued by the CFO's office for urgent one-time payments. I processed them because they appeared legitimate — they carried proper authorization codes and Helen's digital signature."

---

Statement — Tom, IT Security:
"We reviewed the system access logs. Helen's credentials were used to generate the exemption codes and digital signatures — all from her office terminal between 7:00 PM and 9:00 PM on six separate evenings. Helen's badge access log shows she did not badge into the building on any of those six evenings."

---

Vendor registration record — Veltro Supplies:
Registered: June 28th
Registered by: Internal system admin account
Account linked to: First National Bank — Account holder: D. Reyes`,
    number: "001",
    difficulty: "Hard",
    options: [
      { key: "A", text: "Helen — the CFO" },
      { key: "B", text: "Marcus — Head of Procurement" },
      { key: "C", text: "Diana — Head of Finance" },
      { key: "D", text: "Tom — IT Security" },
    ],
    solution: "C",
    explanation:
      "Diana processed all six transactions. The vendor was registered by an internal system admin account linked to D. Reyes — Diana's last name. Helen's credentials were used from her office terminal on evenings Helen never badged into the building — meaning someone accessed her terminal physically while she was away. Diana had access to the finance system, processed every payment, and the bank account is registered in her name. She used Helen's unattended terminal on six evenings to generate the authorization codes herself.",
    category: "investigation",
    timeLimit: 300,
  },

  {
    id: 2,
    title: "THE DETECTIVE",
    subTitle:
      "A man was found dead in his apartment — four people had access that night",
    emoji: "🔍",
    question: "Who is responsible for Victor Hale's death?",
    case: `Incident Report — Case #CR-2024-117
Victim: Victor Hale, 44
Time of death: Between 10:00 PM and midnight, Friday
Location: Apartment 9B, 14 Creston Avenue

Coroner's note:
Cause of death — acute poisoning. Substance found in a half-empty whiskey glass on the kitchen counter. No signs of forced entry. Victim knew his attacker.

---

Statement — Nora, Victor's sister:
"I visited Victor around 7:00 PM to drop off some documents he needed for work. We had tea, talked for maybe 30 minutes, and I left. He seemed completely fine. I did not go into the kitchen. I haven't spoken to him since."

---

Statement — Patrick, Victor's colleague:
"Victor and I had drinks at his place around 8:30 PM. We shared a bottle of whiskey — the same one on his counter I assume. I left around 9:15 PM. He was alive and in good spirits when I left. We had an argument last week but we resolved it completely."

---

Statement — Lena, Victor's neighbor:
"I heard voices in the hallway around 10:30 PM. I looked through my peephole and saw someone leaving Victor's apartment. It was a woman — dark coat, medium height. She left quickly and took the stairwell."

---

Statement — Greg, building security:
"The elevator camera shows Patrick arriving at 8:28 PM and leaving at 9:17 PM. Nora arrived at 6:55 PM and left at 7:32 PM. No other visitors were logged through the front entrance that evening. The stairwell does not have cameras."

---

Toxicology note:
The poison acts within 45 to 90 minutes of ingestion. It is odorless and dissolves completely in alcohol.

---

Phone records — Victor's phone:
9:31 PM — Incoming call from contact saved as "N" — duration 4 minutes
9:35 PM — Outgoing call to Patrick — duration 1 minute
10:42 PM — Incoming call from unknown number — no answer`,
    number: "002",
    difficulty: "Hard",
    options: [
      { key: "A", text: "Patrick — Victor's colleague" },
      { key: "B", text: "Nora — Victor's sister" },
      { key: "C", text: "An unknown visitor who used the stairwell" },
      { key: "D", text: "Lena — the neighbor" },
    ],
    solution: "B",
    explanation:
      "The poison acts within 45 to 90 minutes — Victor died between 10:00 PM and midnight. Patrick left at 9:17 PM meaning if he poisoned the drink, Victor would have shown symptoms before 10:00 PM at the latest. But Patrick and Victor shared the same whiskey bottle — if it was poisoned before Patrick arrived, Patrick would also be affected. After Patrick left, Victor received a call at 9:31 PM from contact 'N' — Nora. Nora claimed she had not spoken to him since 7:00 PM. That is a lie. Lena saw a woman in a dark coat leaving at 10:30 PM — Nora returned, was let in by Victor after their call, and poisoned his glass before leaving through the stairwell which has no cameras.",
    category: "investigation",
    timeLimit: 300,
  },

  {
    id: 3,
    title: "THE ANALYST",
    subTitle:
      "A classified message was intercepted — your job is to find what is really being communicated",
    emoji: "📡",
    question: "What is the real instruction hidden inside this message?",
    case: `Intercepted transmission — Friday 11:14 PM
Channel: Encrypted civilian email
From: Unknown
To: Unknown

Subject: Family update

"Dear Uncle,

Everything here is moving along well. Life has settled into a comfortable routine since the move. Every morning I walk the same path — past the old bakery on Creston, north toward the river, down to the small park near the water. It clears my mind before the day begins.

Recently visited the old neighborhood. Spoke to several people there. All seem to be doing well, nothing unusual to report. Tomorrow I plan to visit again — earlier than usual. Around the time the shops first open.

Keep well. We should meet again soon. I will reach out when the moment is right.

Always,
R."

---

Analyst background note:
This email was flagged because the sender's address was previously linked to a surveillance operation. The recipient's address belongs to a known intermediary. In previous intercepted messages from this source, instructions were embedded using the first letter of each sentence.`,
    number: "003",
    difficulty: "Hard",
    options: [
      {
        key: "A",
        text: "MEET EARLY — a meeting request at an early morning location",
      },
      {
        key: "B",
        text: "ENSR — an acronym for a target location or operation name",
      },
      {
        key: "C",
        text: "EXTRACT TOMORROW — an instruction to extract someone the following day",
      },
      {
        key: "D",
        text: "The message contains no hidden instruction — it is a genuine family update",
      },
    ],
    solution: "A",
    explanation:
      "The analyst note reveals that instructions are hidden using the first letter of each sentence. Taking the first letter of each sentence in the body of the message: E-L-E-R-S-A-T-A-K-I-W-A — but the key sentences carrying the instruction are the action-oriented ones: 'Every morning...' — E, 'Meet again soon' — M, 'Earlier than usual' — E, 'Around the time...' — A, 'Tomorrow I plan...' — T. The embedded instruction reads: MEET AT — pointing to an early morning meeting. Combined with 'earlier than usual, around the time the shops first open' the full instruction is MEET EARLY.",
    category: "coded",
    timeLimit: 300,
  },
  {
    id: 4,
    number: "004",
    difficulty: "HARD",
    category: "investigation",
    title: "THE DEFENSE ATTORNEY",
    subTitle: "A witness deposition regarding a midnight getaway",
    emoji: "⚖️",
    case: `WITNESS STATEMENT: Mr. Elias Vance\n
  "I was standing on my third-floor balcony overlooking the alleyway behind the museum at exactly 12:05 AM. It was a clear, moonless night, but the high-pressure sodium streetlights at the end of the alley provided enough orange glow to see clearly. 
  
  A man jumped from the second-floor window—must have been ten feet up. He landed perfectly, didn't make a sound. He was wearing a heavy, dark canvas jacket. I saw him clearly as he ran past the seven-foot-high brick wall that lines the East side of the alley. Even in the dark, I noticed his shadow stretching out long and thin across the wall to his right as he headed North toward the street. 
  
  He jumped into a parked electric sedan. I know it was electric because as he floored it, the engine let out a deafening, high-pitched roar that echoed off the buildings for blocks. I watched the red taillights vanish as he turned the corner."`,

    question:
      "The attorney knows Elias Vance is lying about seeing the suspect. What is the primary contradiction?",

    img: "",
    options: [
      {
        key: "A",
        text: "A 'moonless' night would provide zero visibility, regardless of the streetlights at the end of the alley.",
      },
      {
        key: "B",
        text: "If he was heading North and his shadow was on the wall to his Right (East), the light source would have to be in the West.",
      },
      {
        key: "C",
        text: "Electric vehicles do not produce a 'deafening roar' when accelerating; they are nearly silent.",
      },
      {
        key: "D",
        text: "A man jumping from ten feet in a 'heavy canvas jacket' would inevitably make a loud sound upon landing.",
      },
    ],
    solution: "C",
    explanation:
      "While the shadow logic (B) is a classic distractor, the 'Hard' truth is a mechanical impossibility: Electric vehicles are famous for their lack of engine noise. They do not 'roar' or 'echo for blocks'—that is a characteristic of a combustion engine. Vance is describing a 'movie version' of a getaway, not what he actually heard.",
    timeLimit: 300,
  },
  {
    id: 5,
    number: "005",
    difficulty: "HARD",
    category: "imposter",
    title: "THE CYBER-SECURITY AGENT",
    subTitle: "A high-priority internal 'Security Alert' email",
    emoji: "🛡️",
    case: `FROM: IT-Support-Global@Internal-Corp.net
  TO: All Staff
  SUBJECT: URGENT: System Breach Detected
  
  Hello Team,
  We have detected an unauthorized login attempt on the server 'Odin-04' originating from an IP in Eastern Europe at 3:15 AM EST. This login utilized the credentials of Senior Manager Thomas Reed. 
  
  As per protocol, Thomas has been locked out of the system. However, since he is currently on a flight to London with no Wi-Fi access, we cannot verify his activity until he lands in 6 hours. We have upgraded the company firewall to version 9.4.2 to prevent further leaks.
  
  Please click the secure link below (https://portal.external-verification.net/auth) to re-validate your employee ID. Failure to do so by 5:00 PM EST will result in a temporary suspension of your remote access.
  
  Stay vigilant,
  The IT Security Team`,

    question:
      "As the Security Agent, you know this email is a 'Phishing' attempt. Which detail confirms it is fake?",

    img: "",
    options: [
      {
        key: "A",
        text: "The IT department would never mention a specific manager's name in a company-wide security alert.",
      },
      {
        key: "B",
        text: "If Thomas Reed is on a flight to London, he would be moving toward a different time zone, making the 3:15 AM alert invalid.",
      },
      {
        key: "C",
        text: "The 'Internal' IT team is sending users to an 'External-Verification.net' domain to enter their credentials.",
      },
      {
        key: "D",
        text: "Software firewalls are upgraded in whole numbers (9.0 to 10.0), never in small decimal increments like 9.4.2.",
      },
    ],
    solution: "C",
    explanation:
      "The most dangerous red flag in cybersecurity: The email claims to be from the 'Internal' team, but the link points to a '.net' domain hosted on an 'external-verification' site. Corporate IT always keeps authentication on internal '.com' or '.org' domains. Options A and D are common but not strictly rules, making C the only logical 'Hard' proof.",
    timeLimit: 300,
  },
  {
    id: 6,
    number: "006",
    difficulty: "HARD",
    category: "contradiction",
    title: "THE FAMILY MEDIATOR",
    subTitle: "A disputed diary entry found in a weathered leather journal",
    emoji: "📜",
    case: `DIARY ENTRY - JULY 14th, 1972\n
  "The heat today in Arizona is unbearable—112 degrees by noon. I sat under the porch with my old manual typewriter, the keys burning my fingertips as I typed out my final wishes. I wanted to make sure the ink stayed dark and permanent, unlike those messy fountain pens that smudge in this humidity.
  
  I am leaving the ranch to my nephew, Silas. He is the only one who helped me during the Great Flood last winter when the creek rose ten feet and soaked the floorboards of this very house. I remember us stacking sandbags until our backs ached. 
  
  As I sign this now, the sun is high and there isn't a cloud in the sky. My hand is shaking, but my mind is clear. This ranch is his."\n
  [The entry is signed in a thick, wet-looking blue ink.]`,

    question:
      "The family mediator realizes the diary entry was forged recently. What is the 'Hard' logical flaw?",

    img: "",
    options: [
      {
        key: "A",
        text: "Arizona is a desert; it would never have a 'Great Flood' where a creek rises ten feet.",
      },
      {
        key: "B",
        text: "A manual typewriter doesn't use ink that 'smudges'—it uses a ribbon that would be unaffected by humidity.",
      },
      {
        key: "C",
        text: "The writer says they 'typed' the wishes, but then says they are 'signing it now' with 'wet blue ink.'",
      },
      {
        key: "D",
        text: "The writer claims to be worried about ink smudging in 'humidity,' but Arizona heat is notoriously dry.",
      },
    ],
    solution: "D",
    explanation:
      "This is a test of environment vs. narrative. The writer claims it is 112 degrees in Arizona and worries about 'humidity' smudging fountain pen ink. Arizona is famous for 'dry heat,' where humidity is extremely low; ink actually dries *faster* there, it doesn't smudge. The forger, likely from a humid climate, projected their own experience into the lie.",
    timeLimit: 300,
  },
];
