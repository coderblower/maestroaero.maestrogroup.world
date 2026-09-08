/**
 * Maestro Aero - Main JavaScript
 * Handles interactive flight search widget, modal popups, mobile menu, FAQ accordion, and smooth UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('is-active');
      const isOpen = mobileNav.classList.contains('is-active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile nav when clicking any link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Trip Type Toggle (One Way / Round Trip)
  const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');
  const returnDateGroup = document.getElementById('returnDateGroup');

  tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (returnDateGroup) {
        if (e.target.value === 'round') {
          returnDateGroup.style.display = 'flex';
        } else {
          returnDateGroup.style.display = 'none';
        }
      }
    });
  });

  // 4. Airport Swap Button
  const swapBtn = document.getElementById('swapAirportsBtn');
  const originInput = document.getElementById('originAirport');
  const destInput = document.getElementById('destAirport');

  if (swapBtn && originInput && destInput) {
    swapBtn.addEventListener('click', () => {
      const temp = originInput.value;
      originInput.value = destInput.value;
      destInput.value = temp;

      // Quick visual feedback
      swapBtn.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        swapBtn.style.transform = '';
      }, 300);
    });
  }

  // 5. Interactive Flight Search Simulation
  const searchBtn = document.getElementById('searchFlightBtn');
  const resultsPreview = document.getElementById('flightResultsPreview');

  if (searchBtn && resultsPreview) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = searchBtn.innerHTML;
      searchBtn.innerHTML = `
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg> Searching...
      `;
      searchBtn.disabled = true;

      setTimeout(() => {
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
        resultsPreview.classList.add('show');
        resultsPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  // 6. Modal Dialogs (Bid & Booking Select)
  const modalOverlay = document.getElementById('actionModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openBidModal = function() {
    if (!modalOverlay) return;
    modalTitle.textContent = 'Bid on Flight W51003';
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 1rem;">
          Submit your custom fare bid for <strong>Dubai (DXB) → Dhaka (DAC)</strong>. If your bid is accepted by the airline within 2 hours, your booking is confirmed!
        </p>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 1.25rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.85rem; color: #64748b;">
            <span>Standard Price: <strong>৳ 45,005</strong></span>
            <span style="color: #00897b; font-weight: 700;">Winning Chance: High (85%)</span>
          </div>
          <label style="display: block; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.35rem; color: #0f172a;">YOUR BID AMOUNT (BDT)</label>
          <input type="number" id="customBidInput" value="38500" min="25000" max="45000" step="500" style="width: 100%; font-size: 1.35rem; font-weight: 800; color: #ff5722; padding: 0.6rem 0.85rem; border: 2px solid #00897b; border-radius: 8px; background: #fff;" />
        </div>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
          <button type="button" onclick="document.getElementById('customBidInput').value=36000" style="padding: 0.4rem 0.8rem; background: #e0f2f1; color: #00695c; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">৳ 36,000</button>
          <button type="button" onclick="document.getElementById('customBidInput').value=38500" style="padding: 0.4rem 0.8rem; background: #e0f2f1; color: #00695c; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">৳ 38,500</button>
          <button type="button" onclick="document.getElementById('customBidInput').value=41000" style="padding: 0.4rem 0.8rem; background: #e0f2f1; color: #00695c; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">৳ 41,000</button>
        </div>
        <button class="btn btn-accent" style="width: 100%; padding: 0.85rem;" onclick="confirmBid()">
          Place My Bid Now
        </button>
      </div>
    `;
    modalOverlay.classList.add('open');
  };

  window.openSelectModal = function(fareType, price) {
    if (!modalOverlay) return;
    modalTitle.textContent = 'Confirm Flight Reservation';
    modalBody.innerHTML = `
      <div>
        <div style="background: #e0f2f1; color: #00695c; padding: 0.85rem 1rem; border-radius: 10px; margin-bottom: 1.25rem; font-size: 0.9rem; font-weight: 600;">
          ✈ Mahan Air • Flight W51003 (Boeing 777-200ER)
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="color: #64748b;">Route</span>
          <strong style="color: #0f172a;">Dubai (DXB) ➔ Dhaka (DAC)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="color: #64748b;">Cabin Class</span>
          <strong style="color: #00897b; text-transform: uppercase;">${fareType}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="color: #64748b;">Loyalty Rewards</span>
          <span style="color: #ff5722; font-weight: 700;">+450 Maestro & Miles Points</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 1.15rem;">
          <span style="font-weight: 700; color: #0f172a;">Total Fare</span>
          <span style="font-weight: 800; color: #00897b;">${price}</span>
        </div>
        <a href="#download" class="btn btn-primary" style="width: 100%; padding: 0.85rem;" onclick="closeModal()">
          Continue on Maestro Aero App
        </a>
      </div>
    `;
    modalOverlay.classList.add('open');
  };

  window.confirmBid = function() {
    const bidVal = document.getElementById('customBidInput') ? document.getElementById('customBidInput').value : '38,500';
    modalTitle.textContent = 'Bid Submitted Successfully!';
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="width: 60px; height: 60px; background: #e0f2f1; color: #00897b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #0f172a;">Bid of ৳ ${Number(bidVal).toLocaleString()} Placed</h4>
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.5;">
          Your offer has been submitted to Mahan Air. You will receive an instant push notification on your Maestro Aero App as soon as the seat is awarded!
        </p>
        <button class="btn btn-primary" style="width: 100%;" onclick="closeModal()">Done</button>
      </div>
    `;
  };

  window.closeModal = function() {
    if (modalOverlay) modalOverlay.classList.remove('open');
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 7. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 8. Dynamic Copyright Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
