
// script.js – Brave Feelings interactive features

document.addEventListener("DOMContentLoaded", function () {
    console.log("Brave Feelings landing page loaded.");

    // Button Smooth Scroll (Explore Energize / Shop Etsy)
    const buttons = document.querySelectorAll("[data-scroll-to]");
    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            const targetId = this.getAttribute("data-scroll-to");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Newsletter Signup Feedback (Static for now)
    const form = document.getElementById("email-signup-form");
    const feedback = document.getElementById("form-feedback");
    if (form && feedback) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            feedback.textContent = "Thanks for joining the Brave Feelings community!";
            form.reset();
        });
    }
});
