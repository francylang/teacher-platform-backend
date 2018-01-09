const createComment = (knex, comment) => knex('comments').insert(comment);

const createDiscussion = (knex, comments, discussion) => {
  return knex('discussions').insert(discussion, 'id')
    .then((uniqueDiscussionId) => {
      const commentPromises = [];

      comments.forEach((comment) => {
        commentPromises.push(createComment(knex, {
          body: comment.body,
          discussionId: uniqueDiscussionId[0],
        }));
      });
      return Promise.all(commentPromises);
    })
    // eslint-disable-next-line
    .catch(error => console.log(`Error in discussion: ${error}`));
};

const createTopicTag = (knex, topic) => {
  return knex('topicTags').insert({
    id: topic.id,
    tagTitle: topic.tagTitle,
  }, 'id')
    .then((topicTagId) => {
      const discussionPromises = [];

      topic.discussions.forEach((discussion) => {
        discussionPromises.push(createDiscussion(knex, discussion.comments, {
          title: discussion.title,
          body: discussion.body,
          tagId: topicTagId[0],
          tagTitle: discussion.tagTitle,
        }));
      });
      return Promise.all(discussionPromises);
    })
    // eslint-disable-next-line
    .catch(error => console.log(`Error in topic: ${error}`));
};

exports.seed = (knex, Promise) => {
  return knex('comments').del()
    .then(() => knex('discussions').del())
    .then(() => knex('topicTags').del())
    .then(() => {
      const topicTagPromises = [];

      discussionsData.forEach((topic) => {
        topicTagPromises.push(createTopicTag(knex, topic));
      });
      return Promise.all(topicTagPromises);
    })
    // eslint-disable-next-line
    .catch(error => console.error(`Error seeding data: ${error}`));
};

const discussionsData = [
  {
    id: 1,
    tagTitle: "6.RP.A.1",
    discussions: [
      {
        tagTitle: "6.RP.A.1",
        title: "Unit Rate",
        body: "Didn't kids get this in Grade 5? I'm confused about why it's in the standards.",
        comments: [
          {
            body: "Yes but it's important",
          },
          {
            body: "Here is a link to the progression docs: LINK",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    tagTitle: "6.RP.A.2",
    discussions: [
      {
        tagTitle: "6.RP.A.2",
        title: "Tape Diagrams",
        body: "I'm having a hard time grasping tape diagrams well enough to teach kids how to use them as a tool. Any resources?",
        comments: [
          {
            body: "Learn Zillion!",
          },
        ],
      },
      {
        tagTitle: "6.RP.A.2",
        title: "Double number line",
        body: "I get it, but I'm struggling to find the words to explain this without getting too procedural. Any tips?",
        comments: [
          {
            body: "Here is a resource...",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    tagTitle: "6.RP.A.3",
    discussions: [
      {
        tagTitle: "6.RP.A.3",
        title: "Coodinate Plane",
        body: "Should students already know how to plot points on a coordinate plane?.",
        comments: [
          {
            body: "They should know x is horizontal and y is vertical; be preapred for misconceptions about counting into negative integers.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    tagTitle: "6.EE.A.1",
    discussions: [
      {
        tagTitle: "6.EE.A.1",
        title: "Percent",
        body: "I'm looking for great percent (with part, whole vocab) anchor charts - any pictures?",
        comments: [
          {
            body: "Here you go!",
          },
          {
            body: "Come by Stapleton!",
          },
        ],
      },
      {
        tagTitle: "6.EE.A.1",
        title: "Measurement",
        body: "Specifically what units do we care about converting? Should students have ratios memorized, or can we assume they just need to understand how the two units compare and perform the conversion?",
        comments: [
          {
            body: "We are having a PD on this next week - will post resources after",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    tagTitle: "6.RP.A.3",
    discussions: [
      {
        tagTitle: "6.RP.A.3",
        title: "Dividing Fractions",
        body: "Specifically what units do we care about converting? Should students have ratios memorized, or can we assume they just need to understand how the two units compare and perform the conversion?",
        comments: [
          {
            body: "Yes but it's important",
          },
          {
            body: "Here is a link to the progression docs: LINK",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    tagTitle: "6.RP.A.3",
    discussions: [
      {
        tagTitle: "6.RP.A.3",
        title: "GCF LCM Visuals",
        body: "Any great visuals for GCF and LCM?",
        comments: [
          {
            body: "Yes but it's important",
          },
          {
            body: "Here is a link to the progression docs: LINK",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    tagTitle: "6.SP.A.1",
    discussions: [
      {
        tagTitle: "6.SP.A.1",
        title: "Absolute Value",
        body: "What hands-on activities do you recommend for teaching this?",
        comments: [
          {
            body: "I make a life size number line in the hallway",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    tagTitle: "6.NS.B.2",
    discussions: [
      {
        tagTitle: "6.NS.B.2",
        title: "Tasks",
        body: "Any great real-world tasks involving coordinate plane?",
        comments: [
          {
            body: "Here you go!",
          },
        ],
      },
      {
        tagTitle: "6.NS.B.2",
        title: "Variable - vocab",
        body: "Should students be using the term 'variables'? The standard says '... in which letters stand for numbers'.",
        comments: [
          {
            body: "Definitely. You should model and have them use precise vocabulary at all times.",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    tagTitle: "6.NS.B.3",
    discussions: [
      {
        tagTitle: "6.NS.B.3",
        title: "Subtract y from 5",
        body: "What kind of think-alouds or exploratory tasks, etc. can be done to help students see that 'subtract y from 5' = 5 - y and not y - 5? Thanks!",
        comments: [
          {
            body: "Here is an anchor that helps with the language.",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    tagTitle: "6.NS.B.3",
    discussions: [
      {
        tagTitle: "6.NS.B.3",
        title: "Vocab strategies",
        body: "Does anyone have a fun way of reinforcing vocabulary?",
        comments: [
          {
            body: "It doesn't need to be fun.",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    tagTitle: "6.NS.B.4",
    discussions: [
      {
        tagTitle: "6.NS.B.4",
        title: "Factoring out of Distributive Property",
        body: "How do you teach kids to factor out an expression such as 24x + 18? I can 'drill and kill' a procedure, but I'd love to teach it in a better way.",
        comments: [
          {
            body: "What do they have in common?",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    tagTitle: "6.NS.C.5",
    discussions: [
      {
        tagTitle: "6.NS.C.5",
        title: "Equations?",
        body: "How many step - equations should we have them solve?",
        comments: [
          {
            body: "one and two",
          },
        ],
      },
    ],
  },
  {
    id: 13,
    tagTitle: "6.NS.C.6",
    discussions: [
      {
        tagTitle: "6.NS.C.6",
        title: "Dependent/Independent",
        body: "How can we collaborate with the science team to reinforce dependent/independent variables?",
        comments: [
          {
            body: "Great question - here is their pacing guide",
          },
        ],
      },
      {
        tagTitle: "6.NS.C.6",
        title: "ELL - vocab",
        body: "This is especially difficult for my students who are ELLs. ANy strategies to help them?",
        comments: [],
      },
    ],
  },
  {
    id: 14,
    tagTitle: "6.G.A.1",
    discussions: [
      {
        tagTitle: "6.G.A.1",
        title: "Dependent/Independent",
        body: "How can we collaborate with the science team to reinforce dependent/independent variables?",
        comments: [
          {
            body: "Great question - here is their pacing guide",
          },
        ],
      },
    ],
  },
  {
    id: 15,
    tagTitle: "6.NS.C.6",
    discussions: [
      {
        tagTitle: "6.NS.C.6",
        title: "Variables",
        body: "How do you represent variables with algeblocks?",
        comments: [
          {
            body: "here's a great resource!",
          },
        ],
      },
    ],
  },
  {
    id: 16,
    tagTitle: "6.NS.C.6.C",
    discussions: [
      {
        tagTitle: "6.NS.C.6.C",
        title: "This is completely made up",
        body: "BAHHHHHH",
        comments: [
          {
            body: "Here you go!",
          },
        ],
      },
    ],
  },
  {
    id: 17,
    tagTitle: "6.NS.C.7",
    discussions: [
      {
        tagTitle: "6.NS.C.7",
        title: "3D Nets",
        body: "I know this isn't a prioritized standard, but would love to do this on a culture day - any fun activities out there?",
        comments: [
          {
            body: "YES! Here is a super fun activity.",
          },
        ],
      },
    ],
  },
  {
    id: 18,
    tagTitle: "6.NS.C.7",
    discussions: [
      {
        tagTitle: "6.NS.C.7",
        title: "Data - overall shape",
        body: "How far should we go into 'overall shape'?",
        comments: [
          {
            body: "Students should be able to identify trends and patterns.",
          },
          {
            body: "I would want students to say something like 'By the shape of the data, I can see that most students have a cell phone.'",
          },
        ],
      },
    ],
  },
  {
    id: 19,
    tagTitle: "6.EE.C.9",
    discussions: [
      {
        tagTitle: "6.EE.C.9",
        title: "Central Tend - Graphic Organizers",
        body: "Any good graphic organizers for all the measures of central tendency?",
        comments: [
          {
            body: "See attached.",
          },
        ],
      },
    ],
  },
  {
    id: 20,
    tagTitle: "6.NS.C.7",
    discussions: [
      {
        tagTitle: "6.NS.C.7",
        title: "Which data display to prioritize?",
        body: "I only have time to cover two: dot, histogram, or box plots? What's more importnat for 7th-8th?",
        comments: [
          {
            body: "I would NOT prioritize box plots",
          },
        ],
      },
    ],
  },
  {
    id: 21,
    tagTitle: "8.SP.A.1",
    discussions: [
      {
        tagTitle: "8.SP.A.1",
        title: "Nonlinear Association",
        body: "I'm reading Q17 on the test and don't understand the wording - is it a poorly worded question or is there something I'm missing?",
        comments: [
          {
            body: "I agree, the question should be re-worded.",
          },
        ],
      },
    ],
  },
  {
    id: 22,
    tagTitle: "8.G.A.1",
    discussions: [
      {
        tagTitle: "8.G.A.1",
        title: "Rotations",
        body: "Some kids just don't see this, and it comes to easy to me so I'm finding myself stuck when trying to explain how to 'see' how something would rotate. Any ideas?",
        comments: [
          {
            body: "Visuals and kinesthetics! There are tons of videos out there that illustrate, and you can use paper cut-outs so kids can move the shapes around on their graph paper. ",
          },
        ],
      },
    ],
  },
  {
    id: 23,
    tagTitle: "8.EE.A.1",
    discussions: [
      {
        tagTitle: "8.EE.A.1",
        title: "Exponent Rules",
        body: "I am having a difficult time understanding the concept behind this, therefore how to support students' understanding rather than just teaching a way to memorize this 'fact'.",
        comments: [
          {
            body: "This video was really helpful when I was in the same place: https://www.youtube.com/watch?v=zE-ySqkT-9E",
          },
        ],
      },
    ],
  },
  {
    id: 24,
    tagTitle: "8.F.A.1",
    discussions: [
      {
        tagTitle: "8.F.A.1",
        title: "Graphing Functions",
        body: "The word 'understand' in this standard is so hard for me to be clear on the depth at which students need to understand that a function is a rule and how it would be graphed.",
        comments: [],
      },
    ],
  },
  {
    id: 25,
    tagTitle: "8.NS.A.1",
    discussions: [
      {
        tagTitle: "8.NS.A.1",
        title: "Pi Day",
        body: "I am planning a PI day activity.I found the resources in curriculum guide, but most are not very hands-on. Looking for any other ways to have fun with circles!",
        comments: [
          {
            body: "You can challenge kids to see who can memorize the greatest number of digits of Pi!",
          },
        ],
      },
    ],
  },
  {
    id: 26,
    tagTitle: "7.RP.A.1",
    discussions: [
      {
        tagTitle: "7.RP.A.1",
        title: "Fractional Unit Rates",
        body: "I'm looking at the unit guide and example problems and am wondering - how 'real-life' is it to solve these problems? The complexity of fractions is taking away from my students mastering the concept of proportionality.",
        comments: [
          {
            body: "This is a great, and tricky question. It's not too 'real-life', but it's important that students can handle the cognitive burden of these multi-step problems. .",
          },
          {
            body: "I recommend a graphic organizer - model how to use it and have them use it regularly to help them organize their work and see that they CAN do it, just need to keep organized so they can keep track of what step in the process they are on.",
          },
        ],
      },
    ],
  },
  {
    id: 27,
    tagTitle: "7.NS.A.1",
    discussions: [
      {
        tagTitle: "7.NS.A.1",
        title: "Addition and Subtration on a number line",
        body: "I am struggling to truly understand the 'why' behind 'subtracting a negative is the same as adding'. What is your explanation?",
        comments: [
          {
            body: "LearnZillion has a great video that explains this. I personally think this is best modeled with red and yellow chips.",
          },
          {
            body: "3 - (-5). Put out 3 yellow chips. You need to subtract 5 reds, but you don't have any reds! If you bring on 5 reds to your mat, you also need to bring on 5 yellows to maintain the value of 3. Now you have 8 yellows and 5 reds. Remove the 5 reds.",
          },
        ],
      },
    ],
  },
  {
    id: 28,
    tagTitle: "6.SP.A.1",
    discussions: [
      {
        tagTitle: "6.SP.A.1",
        title: "Generalizing Data",
        body: "The concept of generalizing data is difficult for MS students - looking for a specific real-world situation that could be used to illustrate how generalizing data has HELPED someone make a decision!",
        comments: [
          {
            body: "An app developer was deciding if she should make an iPhone or Android app for teenagers. She found that most teenagers use the iPhone, so made the iPhone app.",
          },
        ],
      },
    ],
  },
  {
    id: 29,
    tagTitle: "7.EE.A.1",
    discussions: [
      {
        tagTitle: "7.EE.A.1",
        title: "EE Vocabulary Development Skills",
        body: "I need help finding a way to TEACH study skills; even if class time is given to work on quizlet, some students don't utilize that time well and I don't know how to best support them.",
        comments: [
          {
            body: "I would recommend doing a think-aloud to model how to use quizlet. Depending on your vision for their study routine, maybe even make a checklist.",
          },
          {
            body: "I also think that pre- and post- reflections can be great to help students get 'meta' about these types of skill.",
          },
        ],
      },
    ],
  },

  {
    id: 30,
    tagTitle: "7.G.A.1",
    discussions: [
      {
        tagTitle: "7.G.A.1",
        title: "Scale Drawings",
        body: "I'd love to design a project around scale drawings.I am working to build a rubric; would love any resources you have or input on strgon opinions before I start crafting it. Thanks!",
        comments: [],
      },
    ],
  },
];
