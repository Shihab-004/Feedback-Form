
    const form = document.getElementById("feedbackForm");
    const list = document.getElementById("feedbackList");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;

      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, message })
      });

      const result = await res.json();
      alert(result.msg);
      form.reset();
      loadFeedback();
    });

    async function loadFeedback() {
      const res = await fetch("http://localhost:5000/api/feedback");
      const data = await res.json();
      list.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name}: ${item.message}`;
        list.appendChild(li);
      });
    }

    loadFeedback();
