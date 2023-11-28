const searchDevice = () => {
    // Declare variables
    const input = document.getElementById("search");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("devices");
    const tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
};

window.searchDevice = searchDevice;
