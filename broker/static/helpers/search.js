const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


// search symbols and filter
const searchState = async searchText => {
    const res = await fetch('/symbols');
    const data = await res.json();
    let matches = data.filter(
        bundle => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return bundle.symbol.match(regex) || bundle.name.match(regex);

        })
    outputHtml(matches.slice(0, Math.min(matches.length, 5)));
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

};
// No magic
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
         <div  style="width :206px" class="card card-body mb-0 autoscomplete-items " >
        <span>
         <span class="badge badge-primary"> <a id="symb" href="/info/${match.symbol}">${match.symbol}</a>  </span><span style="display:inline">
         <p style=" font-size: 0.7rem"> <a id="xsymb" href="/info/${match.symbol}">${match.name}</a></p>
         </span>
        
        </span>
         </div>`).join('');
        matchList.innerHTML = html;
    } else matchList.innerHTML = `
    <div  style="width :206px;background-color: #fff
    ;
    " class="card card-body mb-1 autocomplete-items " >
     <span class="badge badge-danger"> <b style=" font-size: 10px">No Matches</b></span>     
    </div>`;
}

search.addEventListener('input', () => searchState(search.value));