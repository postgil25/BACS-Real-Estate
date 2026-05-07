// BACS Founder's OS v2 — Objective-Based Diagnostic Engine
// Olanrewaju Sodiq | Behavioral and Algorithmic Conversion Synthesis

// ─────────────────────────────────────────────────────────────────────────────
// SCORE DERIVATION EXPLANATIONS
// Plain-English: tells the user HOW their M/D/F/P score was calculated
// ─────────────────────────────────────────────────────────────────────────────
const DERIVATIONS = {
    realestate: {
        m: (v, s) => {
            const base = `Derived from your Monthly Page Views (${v.propPageViews.toLocaleString()}). Traffic volume is the primary signal of market motivation entering your pipeline. `;
            return s >= 7 
                ? base + `At ${v.propPageViews.toLocaleString()} views, your funnel is attracting significant market attention and high-intent capital.`
                : base + `Views under 3,000/month indicate a Motivation Void — your funnel is not currently attracting sufficient high-intent capital to the front door.`;
        },
        d: (v, s) => {
            const base = `Derived from your Posts with CTA/Link (${v.socialLinkage}%). Diagnosis measures whether your content actively routes buyers toward a decision. `;
            return s >= 7
                ? base + `Your ${v.socialLinkage}% link-to-content ratio is establishing clear structural pathways for buyers.`
                : base + `Only ${v.socialLinkage}% of your posts contain a structural pathway — ${100 - v.socialLinkage}% of your posts are billboards with no exit ramp.`;
        },
        f: (v, s) => {
            const base = `Derived from your Average Response Time (${v.responseTime} hours). Feasibility measures how frictionless the path to action is. `;
            return s >= 8
                ? base + `At ${v.responseTime} hours, your intake flow is operating at a high efficiency rating of ${s}/10, significantly reducing abandonment.`
                : base + `At ${v.responseTime} hours, your intake flow has a structural resistance rating of ${10-s}/10. Every hour of delay exponentially reduces conversion probability.`;
        },
        p: (v, s) => {
            const base = `Derived from your Viewing/Tour Booking Rate (${v.tourBookingRate}%). Proof is validated by visitors committing to a viewing. `;
            return s >= 8
                ? base + `Your rate of ${v.tourBookingRate}% reflects a high-authority Proof score of ${s}/10 — your signals are convincing investment-grade buyers.`
                : base + `A booking rate of 3%+ is the health benchmark. Your current rate of ${v.tourBookingRate}% translates to a Proof score of ${s}/10, signaling a trust gap.`;
        }
    },
    saas: {
        m: (v, s) => {
            const base = `Derived from your Homepage Bounce Rate (${v.homepageBounce}%). Motivation measures whether buyers feel understood immediately. `;
            return s >= 7
                ? base + `Your ${v.homepageBounce}% bounce rate shows strong resonance with landing traffic.`
                : base + `A bounce rate of 65%+ means the homepage is not asking the right questions. Your ${v.homepageBounce}% bounce rate scores ${s}/10.`;
        },
        d: (v, s) => `Derived from your Pricing Page Clarity rating (${v.pricingClarity}/10). Diagnosis measures whether a buyer can self-qualify. Your self-assessment of ${v.pricingClarity}/10 maps directly to your D score of ${s}/10.`,
        f: (v, s) => {
            const base = `Derived from your Demo Booking Rate (${v.demoBookingRate}%). Feasibility measures friction in the path to commitment. `;
            return s >= 7
                ? base + `Your booking rate of ${v.demoBookingRate}% is operating with high efficiency.`
                : base + `Benchmark for SaaS is 3%+. At ${v.demoBookingRate}%, your intake CTA is creating resistance — F score is ${s}/10.`;
        },
        p: (v, s) => {
            const base = `Derived from your Published Case Studies (${v.caseStudyCount}). Proof requires verifiable third-party validation. `;
            return s >= 7
                ? base + `With ${v.caseStudyCount} case studies, you are establishing strong authority with enterprise buyers.`
                : base + `Enterprise buyers need ~5 relevant case studies to trust a mechanism. Your ${v.caseStudyCount} assets score ${s}/10.`;
        }
    },
    ecommerce: {
        m: (v, s) => {
            const base = `Derived from your Average Time on Product Page (${v.productPageTime} seconds). Motivation measures cognitive engagement. `;
            return s >= 7
                ? base + `Average stay of ${v.productPageTime}s indicates buyers are deeply analyzing the offer.`
                : base + `Under 60s means the buyer isn't reading enough to be convinced. At ${v.productPageTime}s, your M score is ${s}/10.`;
        },
        d: (v, s) => `Derived from your Product Mechanism Clarity rating (${v.mechanismExplained}/10). You rated your own clarity at ${v.mechanismExplained}/10 — your D score is ${s}/10.`,
        f: (v, s) => {
            const base = `Derived from your Checkout Steps (${v.checkoutSteps}). `;
            return s >= 8
                ? base + `Having ${v.checkoutSteps} steps provides a low-friction path to purchase.`
                : base + `Every step above 2 removes ~10% of conversion probability. At ${v.checkoutSteps} steps, your F score is ${s}/10.`;
        },
        p: (v, s) => {
            const base = `Derived from your Average Reviews per Product (${v.reviewCount}). Social validation is key in E-com. `;
            return s >= 7
                ? base + `A volume of ${v.reviewCount} reviews per product provides strong social proof.`
                : base + `Under 15 reviews per product signals uncertainty. At ${v.reviewCount} reviews, your P score is ${s}/10.`;
        }
    },
    agency: {
        m: (v, s) => `Derived from your Target Audience Specificity rating (${v.targetSpecificity}/10). You rated your own targeting specificity at ${v.targetSpecificity}/10 — your M score is ${s}/10.`,
        d: (v, s) => {
            const base = `Derived from your Content Pieces per Week (${v.contentVelocity}). Diagnosis measures frequency of education. `;
            return s >= 7
                ? base + `Velocity of ${v.contentVelocity} pieces/week ensures your diagnostic message reaches the market.`
                : base + `Under 2 pieces/week means the message rarely reaches the market. At ${v.contentVelocity} pieces, your D score is ${s}/10.`;
        },
        f: (v, s) => {
            const base = `Derived from your Lead Form Conversion Rate (${v.leadFormRate}%). Feasibility measures ease of action. `;
            return s >= 7
                ? base + `A ${v.leadFormRate}% form conversion rate indicates low intake friction.`
                : base + `Benchmark is 3%+. At ${v.leadFormRate}%, your intake mechanism is creating friction — F score is ${s}/10.`;
        },
        p: (v, s) => {
            const base = `Derived from your Proposal Acceptance Rate (${v.proposalAcceptance}%). `;
            return s >= 8
                ? base + `An acceptance rate of ${v.proposalAcceptance}% confirms high Proof and trust in your mechanism.`
                : base + `25%+ is optimal. At ${v.proposalAcceptance}%, your P score is ${s}/10, reflecting a validation gap.`;
        }
    },
    services: {
        m: (v, s) => {
            const base = `Derived from your Average Content Engagement Rate (${v.contentEngagement}%). `;
            return s >= 7
                ? base + `Engagement of ${v.contentEngagement}% shows strong resonance with decision-makers.`
                : base + `Under 2% engagement suggests your expertise is invisible. At ${v.contentEngagement}%, M score is ${s}/10.`;
        },
        d: (v, s) => {
            const base = `Derived from your Published Authority Assets (${v.authorityAssets}). `;
            return s >= 7
                ? base + `With ${v.authorityAssets} assets, you allow prospects to self-diagnose your value.`
                : base + `Under 4 assets scores below 6. At ${v.authorityAssets} assets, your D score is ${s}/10.`;
        },
        f: (v, s) => {
            const base = `Derived from your Response Time to Inquiry (${v.avgResponseTime} hours). `;
            return s >= 8
                ? base + `At ${v.avgResponseTime} hours, you are capturing high-intent intent while it is fresh.`
                : base + `Every 3 hours of delay reduces the F score by 1. At ${v.avgResponseTime} hours, your F score is ${s}/10.`;
        },
        p: (v, s) => {
            const base = `Derived from your Published Client Testimonials (${v.testimonialCount}). `;
            return s >= 7
                ? base + `With ${v.testimonialCount} testimonials, you provide verifiable proof proportional to price.`
                : base + `Insufficient testimonials create a trust gap. At ${v.testimonialCount} assets, P score is ${s}/10.`;
        }
    }
};

const OBJECTIVES = {
    realestate: {
        label: '🏗️ Real Estate — Secure Viewing Bookings',
        fields: [
            { id: 'propPageViews', label: 'Monthly Property Page Views', type: 'number', placeholder: 'e.g. 5000' },
            { id: 'contactRate', label: 'Contact Form Completion (%)', type: 'number', placeholder: 'e.g. 2.5', step: '0.1' },
            { id: 'responseTime', label: 'Avg Response Time (hours)', type: 'number', placeholder: 'e.g. 24' },
            { id: 'tourBookingRate', label: 'Viewing/Tour Booking Rate (%)', type: 'number', placeholder: 'e.g. 1.0', step: '0.1' },
            { id: 'socialPostFreq', label: 'Social Posts per Week', type: 'number', placeholder: 'e.g. 3' },
            { id: 'socialLinkage', label: 'Posts with CTA/Link (%)', type: 'number', placeholder: 'e.g. 20' }
        ],
        calc: function(v) {
            let m = Math.min(10, Math.max(1, Math.round(v.propPageViews > 3000 ? 7 + (v.propPageViews - 3000) / 5000 * 3 : v.propPageViews / 3000 * 7)));
            let d = Math.min(10, Math.max(1, Math.round(v.socialLinkage > 50 ? 7 + (v.socialLinkage - 50) / 50 * 3 : v.socialLinkage / 50 * 7)));
            let f = Math.min(10, Math.max(1, Math.round(10 - (v.responseTime / 4))));
            let p = Math.min(10, Math.max(1, Math.round(v.tourBookingRate * 3)));
            return { m, d, f, p };
        },
        leaks: {
            m: "MOTIVATION VOID: Your property pages are not attracting high-intent capital. The traffic source is either diluted or the listing hook is generic. Premium buyers scroll past because nothing signals exclusivity in the first 3 seconds.",
            d: "DIAGNOSIS LEAK: Your social feed is a billboard — premium visuals with zero structural linkage. Posts exist in isolation. No post diagnoses the buyer's specific bottleneck (location, ROI timeline, lifestyle fit).",
            f: "FEASIBILITY LEAK: Your contact flow is a 'Glued-Shut Door.' Relying on a generic 'Contact Us' form with response times over 4 hours signals to a $2M+ buyer that your internal operations are as manual as your intake. Replace the contact form with an instant Capital Feasibility Report.",
            p: "PROOF LEAK (Certainty Starvation): Beautiful assets but zero logical gravity. Missing infrastructure proof, yield data, or verifiable completion records. Investment-grade buyers need P-Signals, not mood boards."
        }
    },
    saas: {
        label: '⚙️ SaaS / Tech — Drive Demo Bookings',
        fields: [
            { id: 'homepageBounce', label: 'Homepage Bounce Rate (%)', type: 'number', placeholder: 'e.g. 65' },
            { id: 'demoBookingRate', label: 'Demo Booking Rate (%)', type: 'number', placeholder: 'e.g. 2.0', step: '0.1' },
            { id: 'trialConversion', label: 'Trial-to-Paid Conversion (%)', type: 'number', placeholder: 'e.g. 8', step: '0.1' },
            { id: 'avgSalesCycle', label: 'Avg Sales Cycle (days)', type: 'number', placeholder: 'e.g. 30' },
            { id: 'pricingClarity', label: 'Pricing Page Clarity (1-10)', type: 'number', placeholder: 'e.g. 6', min: '1', max: '10' },
            { id: 'caseStudyCount', label: 'Published Case Studies', type: 'number', placeholder: 'e.g. 3' }
        ],
        calc: function(v) {
            let m = Math.min(10, Math.max(1, Math.round(10 - v.homepageBounce / 10)));
            let d = Math.min(10, Math.max(1, Math.round(v.pricingClarity)));
            let f = Math.min(10, Math.max(1, Math.round(v.demoBookingRate * 2.5)));
            let p = Math.min(10, Math.max(1, Math.round(Math.min(v.caseStudyCount * 2, 10))));
            return { m, d, f, p };
        },
        leaks: {
            m: "TRIAGE VOID: Your homepage is product-centric, not problem-centric. C-level buyers bounce because nothing asks 'What is your current stack?' or 'What is your seat count?' in the first fold.",
            d: "COMPLEXITY BARRIER: Your pricing page creates cognitive drag. The buyer cannot self-diagnose which tier solves their specific problem without scheduling a call. That call is the friction.",
            f: "THE GLUED-SHUT DOOR: 'Book a Demo' and generic 'Contact Us' forms are high-friction commitment gates. To a C-level buyer, a Contact Us form screams 'your request is going to a black hole.' Replace this manual intake with 'Run a 2-Minute Capacity Audit' for instant value exchange.",
            p: "PROOF DEFICIT: With fewer than 5 published case studies, enterprise buyers cannot verify your mechanism. Your trial-to-paid rate confirms the certainty gap."
        }
    },
    ecommerce: {
        label: '🛒 E-Commerce — Drive Checkout',
        fields: [
            { id: 'cartAbandon', label: 'Cart Abandonment Rate (%)', type: 'number', placeholder: 'e.g. 70' },
            { id: 'productPageTime', label: 'Avg Time on Product Page (sec)', type: 'number', placeholder: 'e.g. 30' },
            { id: 'checkoutSteps', label: 'Number of Checkout Steps', type: 'number', placeholder: 'e.g. 4' },
            { id: 'returnRate', label: 'Return Rate (%)', type: 'number', placeholder: 'e.g. 15' },
            { id: 'reviewCount', label: 'Avg Reviews per Product', type: 'number', placeholder: 'e.g. 12' },
            { id: 'mechanismExplained', label: 'Product Mechanism Clarity (1-10)', type: 'number', placeholder: 'e.g. 5', min: '1', max: '10' }
        ],
        calc: function(v) {
            let m = Math.min(10, Math.max(1, Math.round(v.productPageTime > 60 ? 8 : v.productPageTime / 60 * 8)));
            let d = Math.min(10, Math.max(1, Math.round(v.mechanismExplained)));
            let f = Math.min(10, Math.max(1, Math.round(10 - v.checkoutSteps * 1.5)));
            let p = Math.min(10, Math.max(1, Math.round(Math.min(v.reviewCount / 3, 10))));
            return { m, d, f, p };
        },
        leaks: {
            m: "COGNITIVE DRAG: Users spend less than 60 seconds on your product page. They want the result but their brain is working too hard to understand your technology. Simplify the mechanism of action.",
            d: "MECHANISM GAP: The buyer doesn't understand how your product works. For disruptive products, a missing 'Solution Fit Quiz' means you lose sales to simpler, inferior competitors.",
            f: "CHECKOUT FRICTION: Every additional checkout step costs ~10% of remaining conversions. Your checkout flow is a structural barrier, not a conversion path.",
            p: "SOCIAL PROOF VOID: Fewer than 15 reviews per product signals uncertainty. High-ticket buyers need volume proof before committing. Your return rate confirms the pre-purchase doubt."
        }
    },
    agency: {
        label: '📡 Agency — Generate Qualified Leads',
        fields: [
            { id: 'leadFormRate', label: 'Lead Form Conversion (%)', type: 'number', placeholder: 'e.g. 3.0', step: '0.1' },
            { id: 'caseStudyEngagement', label: 'Case Study Page Views/mo', type: 'number', placeholder: 'e.g. 200' },
            { id: 'proposalAcceptance', label: 'Proposal Acceptance Rate (%)', type: 'number', placeholder: 'e.g. 25' },
            { id: 'clientRetention', label: 'Client Retention Rate (%)', type: 'number', placeholder: 'e.g. 70' },
            { id: 'targetSpecificity', label: 'Target Audience Specificity (1-10)', type: 'number', placeholder: 'e.g. 4', min: '1', max: '10' },
            { id: 'contentVelocity', label: 'Content Pieces per Week', type: 'number', placeholder: 'e.g. 2' }
        ],
        calc: function(v) {
            let m = Math.min(10, Math.max(1, Math.round(v.targetSpecificity)));
            let d = Math.min(10, Math.max(1, Math.round(v.contentVelocity * 2)));
            let f = Math.min(10, Math.max(1, Math.round(v.leadFormRate * 2)));
            let p = Math.min(10, Math.max(1, Math.round(v.proposalAcceptance / 10)));
            return { m, d, f, p };
        },
        leaks: {
            m: "MOTIVATION LEAK: You are targeting 'Small Business Owners' with broad ads. This is Low-Intent Dilution. Target 'Scale-Ready Founders' with a System Diagnosis hook.",
            d: "RANDOM BROADCASTING: Your content is disconnected. No post chains to the next. You are renting eyeballs but don't own the logic. Build a D→F→P content matrix.",
            f: "INFRASTRUCTURE VOID: Sending paid traffic to a generic 'Contact Us' page scores 1/10 on Feasibility. It creates a wait-state that kills intent. Replace the contact form with a 'Conversion Leak Calculator' as the primary intake mechanism.",
            p: "PROPOSAL REJECTION: Your low acceptance rate indicates the prospect understood the problem but didn't believe your mechanism. More case studies with verifiable metrics required."
        }
    },
    services: {
        label: '📋 Professional Services — Book Consultations',
        fields: [
            { id: 'consultBookingRate', label: 'Consultation Booking Rate (%)', type: 'number', placeholder: 'e.g. 1.5', step: '0.1' },
            { id: 'contentEngagement', label: 'Avg Content Engagement Rate (%)', type: 'number', placeholder: 'e.g. 3.0', step: '0.1' },
            { id: 'referralRate', label: 'Referral Rate (%)', type: 'number', placeholder: 'e.g. 20' },
            { id: 'avgResponseTime', label: 'Response Time to Inquiry (hours)', type: 'number', placeholder: 'e.g. 12' },
            { id: 'authorityAssets', label: 'Published Authority Assets (articles, talks)', type: 'number', placeholder: 'e.g. 5' },
            { id: 'testimonialCount', label: 'Client Testimonials Published', type: 'number', placeholder: 'e.g. 8' }
        ],
        calc: function(v) {
            let m = Math.min(10, Math.max(1, Math.round(v.contentEngagement * 2)));
            let d = Math.min(10, Math.max(1, Math.round(Math.min(v.authorityAssets * 1.5, 10))));
            let f = Math.min(10, Math.max(1, Math.round(10 - v.avgResponseTime / 3)));
            let p = Math.min(10, Math.max(1, Math.round(Math.min(v.testimonialCount, 10))));
            return { m, d, f, p };
        },
        leaks: {
            m: "AUTHORITY GAP: Your content engagement rate is below threshold. Prospects are not motivated because your expertise is invisible. Publish structural breakdowns, not promotional posts.",
            d: "DIAGNOSTIC VOID: You have fewer than 5 published authority assets. The prospect cannot self-diagnose that you understand their specific problem before committing to a call.",
            f: "WAIT-STATE TRAP: Your response time exceeds 4 hours. High-intent prospects have already contacted your competitor. Replace with instant booking + automated pre-qualification.",
            p: "CREDIBILITY DEFICIT: Insufficient testimonials create a trust gap. Even qualified prospects need external validation before committing to a professional engagement."
        }
    }
};

let currentObjective = null;

function loadObjective(objId) {
    currentObjective = objId;
    const config = OBJECTIVES[currentObjective];
    document.getElementById('selectedObjLabel').textContent = config.label;
    document.getElementById('resultsObjLabel').textContent = config.label;
    const container = document.getElementById('dynamicFields');
    container.innerHTML = '';
    config.fields.forEach(f => {
        const group = document.createElement('div');
        group.className = 'input-group';
        const lbl = document.createElement('label');
        lbl.setAttribute('for', f.id);
        lbl.textContent = f.label;
        const inp = document.createElement('input');
        inp.type = f.type;
        inp.id = f.id;
        inp.placeholder = f.placeholder;
        if (f.step) inp.step = f.step;
        if (f.min) inp.min = f.min;
        if (f.max) inp.max = f.max;
        group.appendChild(lbl);
        group.appendChild(inp);
        container.appendChild(group);
    });
    showPhase('phase-data');
}

function selectObjective(el) {
    loadObjective(el.dataset.obj);
}

function initBACS() {
    const autoInit = document.body.getAttribute('data-auto-init');
    if (autoInit && OBJECTIVES[autoInit]) {
        loadObjective(autoInit);
        // Hide back button on standalone pages
        const backBtn = document.querySelector('#phase-data .back-btn');
        if(backBtn) backBtn.style.display = 'none';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBACS);
} else {
    initBACS();
}

function goBack() { showPhase('phase-select'); }
function goBackToData() { showPhase('phase-data'); }

function showPhase(id) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function runDiagnosis() {
    const config = OBJECTIVES[currentObjective];
    const values = {};
    config.fields.forEach(f => {
        values[f.id] = parseFloat(document.getElementById(f.id).value) || 0;
    });
    const scores = config.calc(values);
    applyScore('m', scores.m);
    applyScore('d', scores.d);
    applyScore('f', scores.f);
    applyScore('p', scores.p);

    // B = M(D+F) x P — scaled to 1000
    const booking = Math.min(1000, Math.round(scores.m * (scores.d + scores.f) * scores.p / 2));
    document.getElementById('formulaResult').textContent = booking;

    // Primary leak
    const vars = [
        { key: 'm', val: scores.m, name: 'Motivation' },
        { key: 'd', val: scores.d, name: 'Diagnosis' },
        { key: 'f', val: scores.f, name: 'Feasibility' },
        { key: 'p', val: scores.p, name: 'Proof' }
    ];
    vars.sort((a, b) => a.val - b.val);
    const weakest = vars[0];
    document.getElementById('leakAnalysis').textContent = config.leaks[weakest.key];

    // ─────────────────────────────────────────────────────────────────────
    // SCORE CONTEXT BLOCK — Why 1000? Reframe low score as opportunity
    // ─────────────────────────────────────────────────────────────────────
    const potentialUnlocked = 1000 - booking;
    const percentageLost = Math.round((potentialUnlocked / 1000) * 100);
    let scoreContextHTML = '';
    if (booking < 150) {
        scoreContextHTML = `<div class="score-context critical-context">
            <div class="score-context-title">⚠ Why ${booking} out of 1,000?</div>
            <div class="score-context-body">
                <p>The BACS formula <strong>B = M(D + F) × P</strong> calculates your theoretical maximum booking ceiling — the total conversion capacity your pipeline can achieve when all four variables are structurally sound.</p>
                <p>A score of <strong>1,000</strong> represents a mathematically perfect pipeline: maximum traffic (M), clinical buyer diagnosis (D), zero-friction path (F), and undeniable proof architecture (P).</p>
                <p>Your score of <strong>${booking}/1,000</strong> means <strong>${percentageLost}% of your pipeline's booking potential is currently locked behind structural friction</strong>. This is not a measure of your product — it is a measure of your <em>routing architecture</em>.</p>
                <p class="context-highlight">The ${percentageLost}% gap represents real capital that is entering your funnel, hitting a friction point, and exiting without converting. Every month this remains unfixed is a month of compounding capital bleed.</p>
                <p>Your weakest variable — <strong>${weakest.name} (${weakest.val}/10)</strong> — is the structural multiplier suppressing your entire score. Because the BACS formula multiplies variables (not adds them), a single variable near zero collapses the entire output.</p>
            </div>
        </div>`;
    } else if (booking < 400) {
        scoreContextHTML = `<div class="score-context warning-context">
            <div class="score-context-title">📊 Why ${booking} out of 1,000?</div>
            <div class="score-context-body">
                <p>The BACS formula <strong>B = M(D + F) × P</strong> calculates your theoretical maximum booking ceiling — not your current conversion rate, but the <em>architectural capacity</em> of your pipeline.</p>
                <p>A score of <strong>1,000</strong> represents a pipeline where every variable is structurally optimised: maximum intent traffic, clinical buyer routing, zero-friction intake, and verifiable proof signals.</p>
                <p>Your score of <strong>${booking}/1,000</strong> means your pipeline is operating at approximately <strong>${Math.round((booking/1000)*100)}% of its structural capacity</strong>. The remaining <strong>${percentageLost} points</strong> represent bookings that are entering your funnel but leaking out at a specific friction point before converting.</p>
                <p class="context-highlight">Repairing your <strong>${weakest.name}</strong> variable alone would compound significantly across the formula — because all variables multiply each other, not add.</p>
            </div>
        </div>`;
    } else if (booking < 700) {
        scoreContextHTML = `<div class="score-context functional-context">
            <div class="score-context-title">📈 Why ${booking} out of 1,000?</div>
            <div class="score-context-body">
                <p>The BACS formula <strong>B = M(D + F) × P</strong> measures your pipeline's structural ceiling — the total conversion capacity achievable when all four variables are optimised simultaneously.</p>
                <p>Your score of <strong>${booking}/1,000</strong> indicates a functional pipeline. However, the remaining <strong>${potentialUnlocked} points</strong> represent the analytical buyer segment — the high-net-worth, high-intent prospects who require all four variables before committing. Your pipeline currently captures impulse conversions but has a ceiling on analytical ones.</p>
            </div>
        </div>`;
    } else {
        scoreContextHTML = `<div class="score-context optimal-context">
            <div class="score-context-title">✅ Why ${booking} out of 1,000?</div>
            <div class="score-context-body">
                <p>Your score of <strong>${booking}/1,000</strong> indicates a structurally sound pipeline approaching its theoretical maximum. The remaining <strong>${potentialUnlocked} points</strong> represent micro-friction at the unit level — the fine-tuning layer that separates a good pipeline from a compounding revenue engine.</p>
            </div>
        </div>`;
    }
    // Inject score context
    const existingCtx = document.getElementById('scoreContext');
    if (existingCtx) existingCtx.outerHTML = scoreContextHTML.replace('class="score-context', 'id="scoreContext" class="score-context');
    else {
        const formulaBox = document.querySelector('.formula-box');
        const ctxDiv = document.createElement('div');
        ctxDiv.innerHTML = scoreContextHTML.replace('class="score-context', 'id="scoreContext" class="score-context');
        formulaBox.insertAdjacentElement('afterend', ctxDiv.firstChild);
    }

    // Inject derivation explanations into each score card
    const derivations = DERIVATIONS[currentObjective];
    ['m', 'd', 'f', 'p'].forEach(key => {
        const card = document.getElementById('card-' + key);
        let derEl = card.querySelector('.score-derivation');
        if (!derEl) {
            derEl = document.createElement('div');
            derEl.className = 'score-derivation';
            card.appendChild(derEl);
        }
        derEl.textContent = derivations[key](values, scores[key]);
    });

    // Formula verdict
    let verdict = '';
    if (booking < 150) {
        verdict = `CRITICAL STRUCTURAL FAILURE — Your booking ceiling is ${booking}/1,000. The formula B = M(D+F) × P reveals that your weakest variable — ${weakest.name} at ${weakest.val}/10 — is collapsing the entire conversion architecture. Because BACS variables multiply (not add), a single near-zero score suppresses all others. No amount of ad spend overcomes this. Immediate clinical repair is required to stop the capital bleed.`;
    } else if (booking < 400) {
        verdict = `STRUCTURAL CEILING DETECTED — Score: ${booking}/1,000. Your pipeline converts, but the BACS formula exposes a critical bottleneck: ${weakest.name} at ${weakest.val}/10. Analytical buyers — your highest-value segment — require D and F before Proof can move them. Repairing this single variable will compound across the formula and unlock the next tier of your ceiling.`;
    } else if (booking < 700) {
        verdict = `CONVERSION ARCHITECTURE OPERATIONAL — Score: ${booking}/1,000. Your pipeline is functional, but has not reached its algorithmic maximum. ${weakest.name} (${weakest.val}/10) is the variable preventing the ceiling from being reached. Your pipeline currently captures impulse buyers. The analytical, high-net-worth segment requires the full D+F bracket before P can close them.`;
    } else {
        verdict = `STRUCTURAL OPTIMISATION ACHIEVED — Score: ${booking}/1,000. Your conversion architecture approaches the mathematical ceiling defined by B = M(D+F) × P. All variables are above threshold. To scale further, initiate a BACS Clinical Coordination Call to identify micro-friction at the unit level and build the compound conversion layer.`;
    }
    document.getElementById('formulaVerdict').textContent = verdict;

    // Dynamic CTA urgency
    const ctaSub = document.querySelector('.cta-sub');
    if (booking < 150) {
        ctaSub.textContent = `Your pipeline is operating at ${Math.round((booking/1000)*100)}% structural capacity. ${percentageLost}% of your booking potential is leaking. The repair blueprint is one call away.`;
    } else if (booking < 400) {
        ctaSub.textContent = `${potentialUnlocked} booking points remain locked behind structural friction. The BACS repair blueprint will compound your ${weakest.name} variable across the entire formula.`;
    } else if (booking < 700) {
        ctaSub.textContent = `Your analytical buyer segment requires a ${weakest.name} upgrade to convert. The Engineering Kit shows you the exact structural fix.`;
    } else {
        ctaSub.textContent = `Your pipeline is structurally sound. A Clinical Coordination Call will identify the micro-friction layer holding you below 1,000.`;
    }

    showPhase('phase-results');
}

function applyScore(variable, value) {
    const el = document.getElementById(variable + 'Score');
    const statusEl = document.getElementById(variable + 'Status');
    const card = document.getElementById('card-' + variable);
    el.textContent = value;
    if (value <= 4) {
        statusEl.textContent = 'CRITICAL';
        statusEl.className = 'status-badge status-critical';
        el.style.color = 'var(--danger)';
        card.style.borderColor = 'rgba(255,77,77,0.3)';
    } else if (value <= 7) {
        statusEl.textContent = 'WARNING';
        statusEl.className = 'status-badge status-warning';
        el.style.color = 'var(--warning)';
        card.style.borderColor = 'rgba(255,165,0,0.2)';
    } else {
        statusEl.textContent = 'OPTIMAL';
        statusEl.className = 'status-badge status-optimal';
        el.style.color = 'var(--success)';
        card.style.borderColor = 'rgba(0,255,136,0.2)';
    }
}
