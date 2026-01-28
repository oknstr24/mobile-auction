let state = {
  highestBid: 0,
  bidder: "-",
  item: "",
  endTime: null
};

const app = document.getElementById("app");

function render() {
  const now = Date.now();
  const ended = state.endTime && now > new Date(state.endTime).getTime();

  app.innerHTML = `
  <div class="container">

    <div class="card">
      <h2>Live Auktion</h2>
      <p><b>Objekt:</b> ${state.item || "Noch nicht gesetzt"}</p>
      <p><b>Höchstgebot:</b> ${state.highestBid.toLocaleString()} €</p>
      <p><b>Bieter:</b> ${state.bidder}</p>
      <p><b>Endzeit:</b> ${state.endTime || "-"}</p>
    </div>

    <div class="card">
      <input id="alias" placeholder="Alias eingeben"><br><br>
      <button class="bid" onclick="bid(200000)">+200.000 €</button>
      <button class="bid" onclick="bid(500000)">+500.000 €</button>
      <button class="bid" onclick="bid(1000000)">+1.000.000 €</button>
    </div>

    <div class="card">
      <h3>Admin</h3>
      <input id="adminCode" placeholder="Admin Code">
      <input id="item" placeholder="Auktionsobjekt">
      <input type="datetime-local" id="endTime">
      <button onclick="startAuction()">Auktion starten</button>
    </div>

  </div>
  `;
}

function bid(step){
  const alias = document.getElementById("alias").value;
  if(!alias) return alert("Alias eingeben!");
  if(state.endTime && Date.now() > new Date(state.endTime)) return;

  state.highestBid += step;
  state.bidder = alias;
  render();
}

function startAuction(){
  const code = document.getElementById("adminCode").value;
  if(code !== "ADMIN123") return alert("Falscher Admin Code");

  state.item = document.getElementById("item").value;
  state.endTime = document.getElementById("endTime").value;
  state.highestBid = 0;
  state.bidder = "-";
  render();
}

render();
