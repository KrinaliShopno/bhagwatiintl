document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Sticky Header Glassmorphism scroll effect
  const mainNav = document.querySelector('.main-nav');
  if (mainNav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        mainNav.classList.add('navbar-scrolled');
      } else {
        mainNav.classList.remove('navbar-scrolled');
      }
    });
  }

  // 2. Animated Counter for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const observerOptions = {
      threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNum = parseInt(target.getAttribute('data-count'), 10);
          let currentNum = 0;
          const duration = 2000; // 2 seconds
          const stepTime = Math.max(Math.floor(duration / targetNum), 20);
          
          const counterInterval = setInterval(() => {
            currentNum += Math.ceil(targetNum / 50); // Increment size
            if (currentNum >= targetNum) {
              target.textContent = targetNum + '+';
              clearInterval(counterInterval);
            } else {
              target.textContent = currentNum + '+';
            }
          }, stepTime);
          
          observer.unobserve(target);
        }
      });
    }, observerOptions);
    
    statNumbers.forEach(num => counterObserver.observe(num));
  }

  // 3. Vertical Fuel Surcharge Ticker Animation
  const tickerContainer = document.querySelector('.ticker-container');
  if (tickerContainer) {
    const list = tickerContainer.querySelector('.ticker-list');
    if (list) {
      let scrollHeight = list.scrollHeight;
      let containerHeight = tickerContainer.clientHeight;
      
      // Clone items to create seamless scrolling effect if needed
      if (scrollHeight > containerHeight) {
        const items = list.innerHTML;
        list.innerHTML = items + items; // Duplicate
      }
      
      let scrollSpeed = 1; // pixels per frame
      let scrollTop = 0;
      let isPaused = false;
      
      tickerContainer.addEventListener('mouseover', () => isPaused = true);
      tickerContainer.addEventListener('mouseout', () => isPaused = false);
      
      function scrollTicker() {
        if (!isPaused) {
          scrollTop += scrollSpeed;
          if (scrollTop >= scrollHeight) {
            scrollTop = 0;
          }
          tickerContainer.scrollTop = scrollTop;
        }
        requestAnimationFrame(scrollTicker);
      }
      scrollTicker();
    }
  }

  // 4. Tracking Redirect Handling
  const trackingForm = document.getElementById('tracking-form');
  if (trackingForm) {
    trackingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const awbInput = trackingForm.querySelector('input[name="awb"]');
      if (awbInput && awbInput.value.trim() !== '') {
        window.location.href = `tracking.html?awb=${encodeURIComponent(awbInput.value.trim())}`;
      }
    });
  }

  const secondaryTrackingForm = document.getElementById('sidebar-tracking-form');
  if (secondaryTrackingForm) {
    secondaryTrackingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const awbInput = secondaryTrackingForm.querySelector('input[name="awb"]');
      if (awbInput && awbInput.value.trim() !== '') {
        window.location.href = `tracking.html?awb=${encodeURIComponent(awbInput.value.trim())}`;
      }
    });
  }

  // 5. Contact Form Mock Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Display a beautiful Bootstrap Alert
      const alertContainer = document.createElement('div');
      alertContainer.className = 'alert alert-success alert-dismissible fade show mt-3';
      alertContainer.role = 'alert';
      alertContainer.innerHTML = `
        <strong>Thank you!</strong> Your message has been sent successfully. Our team will contact you shortly.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      
      contactForm.appendChild(alertContainer);
      contactForm.reset();
      
      setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertContainer);
        bsAlert.close();
      }, 5000);
    });
  }

  // 6. Pickup Request Form with WhatsApp receipt generator
  const pickupForm = document.getElementById('pickup-form');
  if (pickupForm) {
    pickupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('pickup-name').value.trim();
      const mobile = document.getElementById('pickup-mobile').value.trim();
      const city = document.getElementById('pickup-city').value.trim();
      const address = document.getElementById('pickup-address').value.trim();
      const email = document.getElementById('pickup-email').value.trim() || 'N/A';
      const weight = document.getElementById('pickup-weight') ? document.getElementById('pickup-weight').value.trim() : 'Unspecified';
      
      // Construct text representation
      const whatsappText = `*Bhagwati International - Pickup Request*%0A` +
                           `-----------------------------------------%0A` +
                           `*Requester:* ${name}%0A` +
                           `*Mobile:* ${mobile}%0A` +
                           `*Pickup City:* ${city}%0A` +
                           `*Address:* ${address}%0A` +
                           `*Email:* ${email}%0A` +
                           `*Est. Weight:* ${weight} kg%0A` +
                           `-----------------------------------------%0A` +
                           `_Please confirm the booking slots._`;
      
      // Corporate WhatsApp Number
      const whatsappNum = '919727533302';
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNum}&text=${whatsappText}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Alert the UI
      const alertContainer = document.createElement('div');
      alertContainer.className = 'alert alert-success mt-3';
      alertContainer.innerHTML = `
        <strong>Request Prepared!</strong> We have redirected you to WhatsApp to complete your pickup slot confirmation.
      `;
      pickupForm.appendChild(alertContainer);
      pickupForm.reset();
    });
  }

  // 7. Interactive Conversion Calculator (Prohibited page)
  const calcForms = {
    length: {
      input: 'length-val', from: 'length-from', to: 'length-to', output: 'length-result',
      factors: {
        'in-cm': 2.54, 'cm-in': 0.3937, 'in-mm': 25.4, 'mm-in': 0.03937, 'ft-m': 0.3048, 'm-ft': 3.2808, 'yd-m': 0.9144, 'm-yd': 1.0936, 'mi-km': 1.6093, 'km-mi': 0.6213
      }
    },
    area: {
      input: 'area-val', from: 'area-from', to: 'area-to', output: 'area-result',
      factors: {
        'sqin-sqcm': 6.4516, 'sqcm-sqin': 0.155, 'sqft-sqm': 0.0929, 'sqm-sqft': 10.7639, 'sqyd-sqm': 0.8361, 'sqm-sqyd': 1.1959, 'sqmi-sqkm': 2.5899, 'sqkm-sqmi': 0.3861, 'ac-ha': 0.4046, 'ha-ac': 2.471
      }
    },
    volume: {
      input: 'vol-val', from: 'vol-from', to: 'vol-to', output: 'vol-result',
      factors: {
        'cuin-cucm': 16.387, 'cucm-cuin': 0.061, 'cuft-cum': 0.0283, 'cum-cuft': 35.3146, 'cuyd-cum': 0.7645, 'cum-cuyd': 1.3079, 'cuin-l': 0.01638, 'l-cuin': 61.0237, 'gal-l': 4.546, 'l-gal': 0.2199, 'usgal-l': 3.7854, 'l-usgal': 0.2641, 'floz-ml': 29.573, 'ml-floz': 0.0338
      }
    },
    weight: {
      input: 'weight-val', from: 'weight-from', to: 'weight-to', output: 'weight-result',
      factors: {
        'oz-g': 28.349, 'g-oz': 0.0352, 'lb-kg': 0.4535, 'kg-lb': 2.2046, 'lton-t': 1.016, 't-lton': 0.9842, 'ston-t': 0.9071, 't-ston': 1.1023
      }
    }
  };

  function bindCalculator(type) {
    const calc = calcForms[type];
    const inputEl = document.getElementById(calc.input);
    const fromEl = document.getElementById(calc.from);
    const toEl = document.getElementById(calc.to);
    const outputEl = document.getElementById(calc.output);

    if (inputEl && fromEl && toEl && outputEl) {
      function calculate() {
        const val = parseFloat(inputEl.value);
        if (isNaN(val)) {
          outputEl.textContent = 'Enter a valid number';
          return;
        }
        
        const fromUnit = fromEl.value;
        const toUnit = toEl.value;
        
        if (fromUnit === toUnit) {
          outputEl.textContent = `${val.toFixed(2)} ${toUnit}`;
          return;
        }
        
        const key = `${fromUnit}-${toUnit}`;
        const reverseKey = `${toUnit}-${fromUnit}`;
        
        if (calc.factors[key]) {
          const result = val * calc.factors[key];
          outputEl.textContent = `${val} ${fromUnit} = ${result.toFixed(3)} ${toUnit}`;
        } else if (calc.factors[reverseKey]) {
          const result = val / calc.factors[reverseKey];
          outputEl.textContent = `${val} ${fromUnit} = ${result.toFixed(3)} ${toUnit}`;
        } else {
          outputEl.textContent = 'Conversion path not found';
        }
      }

      inputEl.addEventListener('input', calculate);
      fromEl.addEventListener('change', calculate);
      toEl.addEventListener('change', calculate);
      // Run once initially
      calculate();
    }
  }

  // Bind all conversion tabs
  Object.keys(calcForms).forEach(type => bindCalculator(type));

  // 8. Simulated Tracking Dashboard Logic (tracking.html)
  const trackingContainer = document.getElementById('shipment-tracking-dashboard');
  if (trackingContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const awb = urlParams.get('awb');
    
    const trackingHeader = document.getElementById('tracking-number-header');
    const loadingScreen = document.getElementById('tracking-loading');
    const resultsScreen = document.getElementById('tracking-results');
    
    if (awb) {
      trackingHeader.textContent = awb;
      
      // Simulate loading state for a realistic experience
      setTimeout(() => {
        loadingScreen.classList.add('d-none');
        resultsScreen.classList.remove('d-none');
        
        // Generate realistic details
        const trackingDetailsDiv = document.getElementById('tracking-dynamic-details');
        const timelineDiv = document.getElementById('tracking-dynamic-timeline');
        
        const awbNumber = awb.toUpperCase();
        
        // Custom dates based on real local time
        const dateObj = new Date();
        const formatDate = (daysAgo) => {
          const d = new Date(dateObj);
          d.setDate(d.getDate() - daysAgo);
          return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        };
        
        // Simulated shipping states
        let detailsHtml = `
          <div class="row g-3">
            <div class="col-sm-6 col-md-3">
              <span class="text-muted d-block text-uppercase small">Carrier</span>
              <strong class="text-dark">BHAGWATI INTERNATIONAL</strong>
            </div>
            <div class="col-sm-6 col-md-3">
              <span class="text-muted d-block text-uppercase small">Origin</span>
              <strong class="text-dark">Surat, India</strong>
            </div>
            <div class="col-sm-6 col-md-3">
              <span class="text-muted d-block text-uppercase small">Destination</span>
              <strong class="text-dark">${awbNumber.startsWith('US') ? 'New York, USA' : awbNumber.startsWith('UK') ? 'London, UK' : 'Toronto, Canada'}</strong>
            </div>
            <div class="col-sm-6 col-md-3">
              <span class="text-muted d-block text-uppercase small">Status</span>
              <span class="badge bg-warning text-dark px-3 py-2">IN TRANSIT</span>
            </div>
          </div>
        `;
        
        let timelineHtml = `
          <div class="timeline-step active">
            <div class="timeline-badge"></div>
            <div class="timeline-content">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h5 class="mb-0 text-dark font-weight-bold">In Cargo Transit - Departure Gateway</h5>
                <small class="text-muted font-weight-bold">${formatDate(0)}</small>
              </div>
              <p class="mb-0 text-muted small">Package departed from customs warehouse and is currently loaded into aircraft. Estimated flight transit underway.</p>
            </div>
          </div>
          
          <div class="timeline-step completed">
            <div class="timeline-badge"></div>
            <div class="timeline-content">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h5 class="mb-0 text-dark">Customs Cleared & Handed Over</h5>
                <small class="text-muted">${formatDate(1)}</small>
              </div>
              <p class="mb-0 text-muted small">Mumbai Gateway Hub - Export customs clearing completed successfully. Parcel hand-off finalized.</p>
            </div>
          </div>
          
          <div class="timeline-step completed">
            <div class="timeline-badge"></div>
            <div class="timeline-content">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h5 class="mb-0 text-dark">Processed & Packed</h5>
                <small class="text-muted">${formatDate(2)}</small>
              </div>
              <p class="mb-0 text-muted small">Surat Logistics Center - Packages consolidated, weight verified, and vacuum-sealed for security clearance.</p>
            </div>
          </div>
          
          <div class="timeline-step completed">
            <div class="timeline-badge"></div>
            <div class="timeline-content">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h5 class="mb-0 text-dark">Shipment Received at Center</h5>
                <small class="text-muted">${formatDate(2)}</small>
              </div>
              <p class="mb-0 text-muted small">Nanpura, Surat - Package picked up from sender and brought to local distribution hub.</p>
            </div>
          </div>
        `;
        
        trackingDetailsDiv.innerHTML = detailsHtml;
        timelineDiv.innerHTML = timelineHtml;
      }, 1500); // 1.5 second loading
    } else {
      // If no AWB passed, show warning or redirect input
      loadingScreen.innerHTML = `
        <div class="text-center py-5">
          <i class="fa fa-exclamation-triangle text-warning display-4 mb-3"></i>
          <h4>No Tracking Number Entered</h4>
          <p class="text-muted">Please enter a valid tracking AWB code in the input form below to view status.</p>
          <div class="max-width-500 mx-auto mt-4">
            <form id="no-awb-form">
              <div class="input-group">
                <input type="text" name="new-awb" required placeholder="Enter AWB Code" class="form-control py-3">
                <button type="submit" class="btn btn-primary">Track Shipment</button>
              </div>
            </form>
          </div>
        </div>
      `;
      
      const noAwbForm = document.getElementById('no-awb-form');
      if (noAwbForm) {
        noAwbForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const newAwb = noAwbForm.querySelector('input[name="new-awb"]').value.trim();
          if (newAwb) {
            window.location.href = `tracking.html?awb=${encodeURIComponent(newAwb)}`;
          }
        });
      }
    }
  }

});
