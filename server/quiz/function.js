const htmlEntitiesMap = {
    '&quot;': '"',
    '&#039;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&cent;': '¢',
    '&pound;': '£',
    '&yen;': '¥',
    '&euro;': '€',
    '&copy;': '©',
    '&reg;': '®',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&ldquo;': '“',
    '&rdquo;': '”',
    '&lsquo;': '‘',
    '&rsquo;': '’',
};


function processData(data) {
    return data.map(item => {
        let correctOption = Math.floor(Math.random() * 4)
        let options = item.incorrect_answers.map(ele => decodeStr(ele))
        options.splice(correctOption, 0, decodeStr(item.correct_answer))
        return {
            question: decodeStr(item.question),
            options: options,
            correctOption: correctOption
        }
    })
}

const decodeStr = (str) => {
    return str.replace(/&[a-z]+;|&#\d+;/g, (entity) => htmlEntitiesMap[entity] || entity);
};

async function getQuestions(data) {
    const URL = `https://opentdb.com/api.php?amount=10&category=${data.category}&difficulty=${data.difficulty}&type=multiple`
    let res = await fetch(URL)
    let questions = await res.json()
    return processData(questions.results)
}

module.exports = { getQuestions }