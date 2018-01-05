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
    tagTitle: "6.RP.A.3.A",
    discussions: [
      {
        tagTitle: "6.RP.A.3.A",
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
        tagTitle: "6.RP.A.3.A",
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
    tagTitle: "6.RP.A.3.B",
    discussions: [
      {
        tagTitle: "6.RP.A.3.B",
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
    tagTitle: "6.RP.A.3.C",
    discussions: [
      {
        tagTitle: "6.RP.A.3.C",
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
    tagTitle: "6.NS.A.1",
    discussions: [
      {
        tagTitle: "6.NS.A.1",
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
    tagTitle: "6.NS.C.6.A",
    discussions: [
      {
        tagTitle: "6.NS.C.6.A",
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
    tagTitle: "6.NS.C.6.B",
    discussions: [
      {
        tagTitle: "6.NS.C.6.B",
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
    tagTitle: "6.NS.C.7.A",
    discussions: [
      {
        tagTitle: "6.NS.C.7.A",
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
    tagTitle: "6.NS.C.7.B",
    discussions: [
      {
        tagTitle: "6.NS.C.7.B",
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
    tagTitle: "6.NS.C.7.B",
    discussions: [
      {
        tagTitle: "6.NS.C.7.B",
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
    tagTitle: "6.NS.C.7.C",
    discussions: [
      {
        tagTitle: "6.NS.C.7.C",
        title: "Anchor charts",
        body: "Who has great anchor charts I can borrow ideas from? I'm not creative!",
        comments: [
          {
            body: "Here are some pics!",
          },
        ],
      },
    ],
  },
  {
    id: 22,
    tagTitle: "6.NS.C.7.D",
    discussions: [
      {
        tagTitle: "6.NS.C.7.D",
        title: "Curriculum order",
        body: "Does it make sense to teach RP standars before NS?",
        comments: [
          {
            body: "Big topic of discussion in the math community - here are some articles to read up on. Each campus can do whichever they believe is best.",
          },
        ],
      },
    ],
  },
  {
    id: 23,
    tagTitle: "6.NS.C.8",
    discussions: [
      {
        tagTitle: "6.NS.C.8",
        title: "Fluency",
        body: "Does anyone have any great fluency activities?",
        comments: [
          {
            body: "Here you go",
          },
        ],
      },
    ],
  },
  {
    id: 24,
    tagTitle: "6.NS.EE.A.1",
    discussions: [
      {
        tagTitle: "6.NS.EE.A.1",
        title: "Fluency",
        body: "Does anyone have any great fluency activities?",
        comments: [],
      },
    ],
  },
  {
    id: 25,
    tagTitle: "6.EE.A.2",
    discussions: [
      {
        tagTitle: "6.EE.A.2",
        title: "Packet format?",
        body: "How do you format your packets? Looking for something I can use daily - consistent and quick.",
        comments: [
          {
            body: "Here you go",
          },
        ],
      },
    ],
  },
  {
    id: 26,
    tagTitle: "6.EE.A.2.A",
    discussions: [
      {
        tagTitle: "6.EE.A.2.A",
        title: "Packet content",
        body: "What all do you print in your packet? If I print too much, the kids work ahead. Ideas?",
        comments: [
          {
            body: "Here you go",
          },
        ],
      },
    ],
  },
  {
    id: 27,
    tagTitle: "6.EE.A.2.B",
    discussions: [
      {
        tagTitle: "6.EE.A.2.B",
        title: "Grading DN",
        body: "Do you grade Do Nows?",
        comments: [
          {
            body: "Yes, this helps hold kids accountable to completing it. Attached are some strategies.",
          },
        ],
      },
    ],
  },
  {
    id: 28,
    tagTitle: "6.EE.A.2.C",
    discussions: [
      {
        tagTitle: "6.EE.A.2.C",
        title: "Trade and Grade",
        body: "Any trade and grade strategies? I would love to see a video of the executiong.",
        comments: [
          {
            body: "Blahblahlbahlblhablah.",
          },
        ],
      },
    ],
  },
  {
    id: 29,
    tagTitle: "6.EE.A.3",
    discussions: [
      {
        tagTitle: "6.EE.A.3",
        title: "Precise Language",
        body: "How are teachers getting students to use precise mathematical vocab?",
        comments: [
          {
            body: "Blahblahlbahlblhablah.",
          },
        ],
      },
    ],
  },
  {
    id: 30,
    tagTitle: "6.EE.A.4",
    discussions: [
      {
        tagTitle: "6.EE.A.4",
        title: "Partners",
        body: "How do you pair kids up? I'm noticing that students farther along are steamrolling kids who need to be supported by that peer.",
        comments: [],
      },
    ],
  },
];
