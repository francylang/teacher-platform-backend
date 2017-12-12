exports.seed = function(knex, Promise) {
  return knex('discussions_topicTags').del()
    .then(() => knex('comments').del())
    .then(() => knex('discussions').del())
    .then(() => knex('topicTags').del())
    .then(() => {
      return Promise.all([
        knex('topicTags').insert([
          { tagTitle: "6.RP.A.1" },
          { tagTitle: "6.RP.A.2" },
          { tagTitle: "6.RP.A.3" },
          { tagTitle: "6.RP.A.3.A" },
          { tagTitle: "6.RP.A.3.B" },
          { tagTitle: "6.RP.A.3.C" },
          { tagTitle: "6.NS.A.1" },
          { tagTitle: "6.NS.B.2" },
          { tagTitle: "6.NS.B.3" },
          { tagTitle: "6.NS.B.4" },
          { tagTitle: "6.NS.C.5" },
          { tagTitle: "6.NS.C.6" },
          { tagTitle: "6.NS.C.6.A" },
          { tagTitle: "6.NS.C.6.B" },
          { tagTitle: "6.NS.C.6.C" },
          { tagTitle: "6.NS.C.7" },
          { tagTitle: "6.NS.C.7.A" },
          { tagTitle: "6.NS.C.7.B" },
          { tagTitle: "6.NS.C.7.C" },
          { tagTitle: "6.NS.C.7.D" },
          { tagTitle: "6.NS.C.8" },
          { tagTitle: "6.EE.A.1" },
          { tagTitle: "6.EE.A.2" },
          { tagTitle: "6.EE.A.2.A" },
          { tagTitle: "6.EE.A.2.B" },
          { tagTitle: "6.EE.A.2.C" },
          { tagTitle: "6.EE.A.3" },
          { tagTitle: "6.EE.A.4" },
          { tagTitle: "6.EE.B.5" },
          { tagTitle: "6.EE.B.6" },
          { tagTitle: "6.EE.B.7" },
          { tagTitle: "6.EE.B.8" },
          { tagTitle: "6.EE.C.9" },
          { tagTitle: "6.G.A.1" },
          { tagTitle: "6.G.A.2" },
          { tagTitle: "6.G.A.3" },
          { tagTitle: "6.G.A.4" },
          { tagTitle: "6.SP.A.1" },
          { tagTitle: "6.SP.A.2" },
          { tagTitle: "6.SP.A.3" },
          { tagTitle: "6.SP.B.4" },
          { tagTitle: "6.SP.B.5" },
          { tagTitle: "6.SP.B.5.A" },
          { tagTitle: "6.SP.B.5.B" },
          { tagTitle: "6.SP.B.5.C" },
          { tagTitle: "6.SP.B.5.D" },
          { tagTitle: "Grade 6 Math" },
        ], 'id')
        .then(topicTag => {
          return knex.('discussions').insert([
          {
            title: "Unit Rate",
            body: "Didn't kids get this in Grade 5? I'm confused about why it's in the standards.",
          },
          {
            title: "Tape Diagrams",
            body: "I'm having a hard time grasping tape diagrams well enough to teach kids how to use them as a tool. Any resources?",
          },
          {
            title: "Coodinate Plane",
            body: "Should students already know how to plot points on a coordinate plane?",
          },
          {
            title: "Percent",
            body: "I'm looking for great percent (with part, whole vocab) anchor charts - any pictures?",
          },
          {
            title: "Measurement",
            body: "Specifically what units do we care about converting? Should students have ratios memorized, or can we assume they just need to understand how the two units compare and perform the conversion?",
          },
          {
            title: "Dividing Fractions",
            body: "Can someone explain the rationale for not using keep change flip? Thanks!",
          },
          {
            title: "GCF LCM Visuals",
            body: "Any great visuals for GCF and LCM?",
          },
          {
            title: "Absolute Value",
            body: "What hands-on activities do you recommend for teaching this?",
          },
          {
            title: "Tasks - 6NSC8",
            body: "Any great real-world tasks involving coordinate plane? M",
          },
          {
            title: "Variable - vocab",
            body: "Should students be using the term 'variables'? The standard says '... in which letters stand for numbers'.",
          },
          {
            title: "Subtract y from 5",
            body: "What kind of think-alouds or exploratory tasks, etc. can be done to help students see that 'subtract y from 5' = 5 - y and not y - 5? Thanks!",
          },
          {
            title: "Vocab strategies",
            body: "Does anyone have a fun way of reinforcing vocabulary?",
          },
          {
            title: "Factoring out of Distributive Property",
            body: "How do you teach kids to factor out an expression such as 24x + 18? I can 'drill and kill' a procedure, but I'd love to teach it in a better way.",
          },
          {
            title: "Equations?",
            body: "How many step - equations should we have them solve?",
          },
          {
            title: "Dependent/Independent",
            body: "How can we collaborate with the science team to reinforce dependent/independent variables?",
          },
          {
            title: "3D Nets",
            body: "I know this isn't a prioritized standard, but would love to do this on a culture day - any fun activities out there?",
          },
          {
            title: "Data - overall shape",
            body: "How far should we go into 'overall shape'?",
          },
          {
            title: "Central Tend - Graphic Organizers",
            body: "Any good graphic organizers for all the measures of central tendency?",
          },
          {
            title: "Which data display to prioritize?",
            body: "I only have time to cover two: dot, histogram, or box plots? What's more importnat for 7th-8th?",
          },
          {
            title: "Anchor charts",
            body: "Who has great anchor charts I can borrow ideas from? I'm not creative!",
          },
          {
            title: "Curriculum order",
            body: "Does it make sense to teach RP standars before NS?",
          },
          {
            title: "Fluency",
            body: "Does anyone have any great fluency activities?",
          },
          {
            title: "Packet format?",
            body: "How do you format your packets? Looking for something I can use daily - consistent and quick.",
          },
          {
            title: "Packet content",
            body: "What all do you print in your packet? If I print too much, the kids work ahead. Ideas?",
          },
          {
            title: "Grading DN",
            body: "Do you grade Do Nows?",
          },
          {
            title: "Trade and Grade",
            body: "Any trade and grade strategies? I would love to see a video of the executiong.",
          },
          {
            title: "Precise Language",
            body: "How are teachers getting students to use precise mathematical vocab?",
          },
          {
            title: "Partners",
            body: "How do you pair kids up? I'm noticing that students farther along are steamrolling kids who need to be supported by that peer.",
          },
          {
            title: "Erasing",
            body: "Pencils? Erasers? Any thoughts on no erasing policy to reinforce learning from mistakes and backtracking work?",
          },
        ], 'id'}) //here's where i need to figure out how to return tagId out of this .then()
        .then((discussionId, topicTag) => { //don't actually have access to tagId here
          return knex('discussions_topicTags').insert([
            { discussionId: discussionId[0], tagId: topicTag[0] },
            { discussionId: discussionId[1], tagId: topicTag[2] },
            { discussionId: discussionId[2], tagId: topicTag[3] },
            { discussionId: discussionId[3], tagId: topicTag[5] },
            { discussionId: discussionId[4], tagId: topicTag[6] },
            { discussionId: discussionId[5], tagId: topicTag[7] },
            { discussionId: discussionId[6], tagId: topicTag[10] },
            { discussionId: discussionId[7], tagId: topicTag[12] },
            { discussionId: discussionId[8], tagId: topicTag[20] },
            { discussionId: discussionId[9], tagId: topicTag[22] },
            { discussionId: discussionId[10], tagId: topicTag[23] },
            { discussionId: discussionId[11], tagId: topicTag[24] },
            { discussionId: discussionId[12], tagId: topicTag[26] },
            { discussionId: discussionId[13], tagId: topicTag[27] },
            { discussionId: discussionId[14], tagId: topicTag[31] },
            { discussionId: discussionId[15], tagId: topicTag[35] },
            { discussionId: discussionId[16], tagId: topicTag[37] },
            { discussionId: discussionId[17], tagId: topicTag[38] },
            { discussionId: discussionId[18], tagId: topicTag[39] },
            { discussionId: discussionId[19], tagId: topicTag[46] },
            { discussionId: discussionId[20], tagId: topicTag[46] },
            { discussionId: discussionId[21], tagId: topicTag[46] },
            { discussionId: discussionId[22], tagId: topicTag[46] },
            { discussionId: discussionId[23], tagId: topicTag[46] },
            { discussionId: discussionId[24], tagId: topicTag[46] },
            { discussionId: discussionId[25], tagId: topicTag[46] },
            { discussionId: discussionId[26], tagId: topicTag[46] },
            { discussionId: discussionId[27], tagId: topicTag[46] },
            { discussionId: discussionId[28], tagId: topicTag[46] },
          ], discussionId )//did i even pass that in right? can i do that?
        })
        .then(discussionId => {
          return knex('comments').insert([
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
            { body: "", discussionId: },
          ])
        })
        .then(() => console.log('DEV seeding complete!'))
        .catch(error => console.error({ error }));
      ]);
    })
    .catch(error => console.error({ error }));
};
