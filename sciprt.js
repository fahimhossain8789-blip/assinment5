
const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];


async function loadIssues() {
    showLoading(true);

    let res = await fetch(api);
    let data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues.slice(0,20));

    document.getElementById("issueCount").innerText =
        allIssues.length + " Issues";

    showLoading(false);
}

loadIssues();



function displayIssues(issues){

    const container = document.getElementById("issuesContainer");
    container.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.className =
        `bg-white p-5 rounded-lg shadow cursor-pointer border-t-4 
        ${issue.status === "open" ? "border-green-500" : "border-purple-500"}`;

        card.innerHTML = `
        <div class="flex justify-between mb-2">

            <span class="w-4 h-4 border-2 border-dashed border-green-500 rounded-full"></span>

            <span class="px-3 py-1 text-xs rounded-full font-bold
            ${issue.priority === "High" ? "bg-red-100 text-red-600" :
            issue.priority === "Medium" ? "bg-yellow-100 text-yellow-600" :
            "bg-blue-100 text-gray-600"}">

            ${issue.priority}

            </span>
        </div>

        <h3 class="text-lg font-semibold mt-2">${issue.title}</h3>

        <p class="text-gray-500 text-sm mt-2">
        ${issue.description}
        </p>

        <div class="flex gap-2 mt-3">

            <span class="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full">
            ${issue.category || "BUG"}
            </span>

            <span class="bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full">
            ${issue.label || "HELP WANTED"}
            </span>

        </div>

        <div class="flex justify-between text-sm text-gray-500 mt-4 pt-3 border-t">

            <span>#${issue.id} by ${issue.author}</span>

            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>

        </div>
        `;

        card.onclick = () => openModal(issue.id);

        container.appendChild(card);

    });

}


async function openModal(id){

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

    const data = await res.json();

    const issue = data.data;

    const modal = document.getElementById("Modal");

    modal.classList.remove("hidden");

    document.getElementById("modalBody").innerHTML = `

        <h2 class="text-2xl font-bold mb-3">${issue.title}</h2>

        <div class="flex gap-3 text-sm text-gray-500 mb-3">

            <span class="bg-green-100 text-green-600 px-2 py-1 rounded-full">
            ${issue.status}
            </span>

            <span>Opened by ${issue.author}</span>

            <span>${issue.createdAt}</span>

        </div>

        <div class="flex gap-2 mb-4">

            <span class="bg-red-100 text-red-500 px-3 py-1 text-xs rounded-full">
            ${issue.category || "BUG"}
            </span>

            <span class="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs rounded-full">
            ${issue.label || "HELP WANTED"}
            </span>

        </div>

        <p class="text-gray-600 mb-5">
        ${issue.description}
        </p>

        <div class="flex justify-between bg-gray-100 p-4 rounded mb-4">

            <div>
                <p class="text-gray-500 text-sm">Assignee</p>
                <b>${issue.author}</b>
            </div>

            <div>
                <p class="text-gray-500 text-sm">Priority</p>
                <span class="font-semibold">${issue.priority}</span>
            </div>

        </div>

        <button onclick="closeModal()" 
        class="bg-purple-700 text-white px-5 py-2 rounded">
        Close
        </button>
    `;

}



function closeModal(){
    document.getElementById("Modal").classList.add("hidden");
}




function showLoading(show){

    const loading = document.getElementById("loading");

    loading.style.display = show ? "block" : "none";

}