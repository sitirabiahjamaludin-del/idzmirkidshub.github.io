// ======= TAB NAVIGATION =======
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected section
    const selectedSection = document.getElementById(sectionId + '-section');
    if (selectedSection) selectedSection.classList.add('active');

    // Set active tab
    const selectedTab = document.getElementById('tab-' + sectionId);
    if (selectedTab) selectedTab.classList.add('active');
}

// ======= FORM MODAL =======
function viewForm(url) {
    const modal = document.getElementById('form-modal');
    const iframe = document.getElementById('form-iframe');
    iframe.src = url;
    modal.style.display = 'flex';
}

function closeFormModal() {
    const modal = document.getElementById('form-modal');
    const iframe = document.getElementById('form-iframe');
    iframe.src = '';
    modal.style.display = 'none';
}

// ======= EXPORT FORM =======
function exportForm(event, url) {
    event.stopPropagation(); // prevent parent onclick
    // Contoh: redirect untuk download / buka link baru
    window.open(url, '_blank');
}

// ======= COLUMN FILTER =======
function toggleColumnFilter(filterId) {
    const filterDiv = document.getElementById('column-filter-' + filterId);
    if (filterDiv.style.display === 'none') filterDiv.style.display = 'block';
    else filterDiv.style.display = 'none';
}

// ======= TOGGLE COLUMN VISIBILITY =======
function toggleColumn(tableId, colIndex) {
    const table = document.getElementById('table-' + tableId);
    if (!table) return;

    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].cells[colIndex];
        if (cell) {
            cell.style.display = (cell.style.display === 'none') ? '' : 'none';
        }
    }
}

// ======= OPTIONAL: APPLY FILTERS =======
function applyFilters() {
    const nameFilter = document.getElementById('search-name').value.toLowerCase();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const tbody = document.getElementById('tbody-ct1');
    const rows = tbody.getElementsByTagName('tr');

    for (let row of rows) {
        const nameCell = row.cells[1]; // Full Name
        const dateCell = row.cells[3]; // Date

        const nameMatch = !nameFilter || (nameCell && nameCell.textContent.toLowerCase().includes(nameFilter));
        const dateValue = dateCell ? dateCell.textContent : '';
        const startMatch = !startDate || dateValue >= startDate;
        const endMatch = !endDate || dateValue <= endDate;

        row.style.display = (nameMatch && startMatch && endMatch) ? '' : 'none';
    }
}

// ======= EXPORT TABLE TO EXCEL =======
function exportToExcel(tableId) {
    const table = document.getElementById('table-' + tableId);
    if (!table) return;

    const html = table.outerHTML;
    const url = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    const link = document.createElement('a');
    link.href = url;
    link.download = tableId + '.xlsx';
    link.click();
}

const countries = [
"Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
"Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
"Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
"Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia",
"Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
"Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
"Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
"Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya",
"Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
"Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius",
"Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
"Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
"Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
"Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
"Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia",
"Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
"Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga",
"Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates",
"United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen",
"Zambia","Zimbabwe"
];

const selectElement = document.getElementById("ChildCitizenship");

countries.forEach(country => {
    let option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    selectElement.appendChild(option);
});