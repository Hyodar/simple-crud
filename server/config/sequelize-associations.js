
module.exports = [
    {
        source: 'Participant',
        target: 'Occupation',
        type: 'belongsTo'
    },
    {
        source: 'Participant',
        target: 'Company',
        type: 'belongsTo'
    },
    {
        source: 'Presentation',
        target: 'Participant',
        type: 'belongsToMany',
        params: {
            through: 'Participant_Presentation',
        },
    },
    {
        source: 'Participant',
        target: 'Presentation',
        type: 'belongsToMany',
        params: {
            through: 'Participant_Presentation',
        },
    },
];
