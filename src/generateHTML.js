function generateHTML(teamArray) {
    const teamCards = teamArray.map(member => generateCard(member)).join('\n');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>My Team</title>
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <header><h1>My Team</h1></header>
        <main>
            <div class="team-cards">
            ${teamCards}
            </div>
        </main>
    </body>
    </html>
    `;
}

function generateCard(member) {
    // Common fields
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();

    // Role-specific data
    let specialField = '';
    switch (role) {
        case 'Manager':
            specialField = `Office Number: ${member.officeNumber}`;
            break;
        case 'Engineer':
            specialField = `GitHub: <a href="https://github.com/${member.getGithub()}" target="_blank">${member.getGithub()}</a>`;
            break;
        case 'Intern':
            specialField = `School: ${member.getSchool()}`;
            break;
    }

    return `
    <div class="card">
        <h2>${name}</h2>
        <h3>${role}</h3>
        <p>ID: ${id}</p>
        <p>Email: <a href="mailto:${email}">${email}</a></p>
        <p>${specialField}</p>
    </div>
    `;
}

module.exports = generateHTML;
