(function () {
  const title = (document.title || document.querySelector('h1')?.textContent || '').split('|')[0].trim();
  const focusByTitle = {
    'Can You Hear Your Body?': [1, 2],
    'Interrupt the Verdict': [1, 2],
    'Why Am I Eating?': [1, 2, 3, 4, 5],
    'Why am I eating?': [1, 2, 3, 4, 5],
    'Behavior Sequence': [1, 2, 3],
    'Permission & Scarcity': [2, 3, 4],
    'What Is This Doing for Me?': [1, 2, 3, 5],
    'Choice Has Conditions': [3, 4, 5],
    'Conditions & Responsibility Map': [3, 4, 5],
    'Participation Planner': [3, 4, 5],
    'Deconstructing a Belief': [1, 2, 3, 4, 5],
    'Who Taught You to Eat?': [2, 3, 4],
    'How Was My Body Image Created?': [2, 3, 4],
    'Values Clarification': [2, 3, 4, 5],
    'My Food & Body Framework': [1, 2, 3, 4, 5],
    'GLP-1 Evidence Answers': [2, 3, 4, 5]
  };
  const focus = focusByTitle[title];
  if (!focus || document.querySelector('[data-shared-method]')) return;

  const labels = ['Notice', 'Interpret', 'Contextualize', 'Locate responsibility', 'Respond'];
  const hasExistingPath = Boolean(document.querySelector('.practice-path'));
  const section = document.createElement('section');
  section.className = 'shared-method';
  section.dataset.sharedMethod = '';
  section.innerHTML = `
    <p class="shared-method__eyebrow">The shared Body Connection method</p>
    <h2>${hasExistingPath ? 'Agency within the method.' : 'Five moves, not five tests.'}</h2>
    ${hasExistingPath ? '' : `<div class="shared-method__path" aria-label="Notice, Interpret, Contextualize, Locate responsibility, Respond">
      ${labels.map((label, i) => `<span class="${focus.includes(i + 1) ? 'is-focus' : ''}"><b>${i + 1}</b>${label}</span>`).join('')}
    </div>`}
    <p class="shared-method__focus"><strong>This tool emphasizes:</strong> ${focus.map(i => labels[i - 1]).join(', ')}. The other moves remain available when they help; none is a test or a requirement to complete the tool correctly.</p>
    <div class="shared-method__agency"><strong>Agency means meaningful participation within conditions.</strong> It is not total control, perfect follow-through, or personal responsibility for everything affecting you. A response may include action, support, accommodation, a boundary, environmental change, or no action yet.</div>`;

  const home = document.querySelector('.screen.active, main, .wrap, body');
  const anchor = home.querySelector('.note, .callout, .lead, h1');
  if (anchor) anchor.insertAdjacentElement('afterend', section);
  else home.prepend(section);

  const style = document.createElement('style');
  style.textContent = `
    .shared-method{margin:1.6rem 0 2rem;padding:1.35rem;background:#fff;border:1px solid #ded8ce;border-radius:20px;color:#2e2b27}
    .shared-method h2{margin:.15rem 0 1rem;color:#31412f;font-family:Georgia,serif;font-size:clamp(1.45rem,3vw,2rem)}
    .shared-method__eyebrow{margin:0;color:#9a593e;font-size:.75rem;font-weight:800;letter-spacing:.11em;text-transform:uppercase}
    .shared-method__path{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.45rem;margin:1rem 0}
    .shared-method__path span{display:flex;align-items:center;gap:.45rem;min-height:54px;padding:.55rem .6rem;border:1px solid #ded8ce;border-radius:12px;color:#6f665d;font-size:.83rem;line-height:1.25}
    .shared-method__path b{display:grid;place-items:center;flex:0 0 1.55rem;height:1.55rem;border-radius:50%;background:#eee9e0;color:#31412f}
    .shared-method__path .is-focus{border-color:#31412f;background:#e8efe5;color:#263524;font-weight:700}
    .shared-method__path .is-focus b{background:#31412f;color:#fff}
    .shared-method__focus{margin:1rem 0;color:#4f4943}
    .shared-method__agency{padding:1rem 1.05rem;border-left:4px solid #c89468;background:#fbf7ef;border-radius:0 12px 12px 0}
    @media(max-width:760px){.shared-method__path{grid-template-columns:1fr}.shared-method__path span{min-height:auto}}
    @media print{.shared-method{break-inside:avoid}}
  `;
  document.head.appendChild(style);

  const phase2Style = document.createElement('style');
  phase2Style.textContent = `
    .progwrap,.progress{height:auto!important;min-height:42px!important;padding:.65rem 4%!important;background:#fbf7eff2!important;border-bottom:1px solid #ded8ce!important}
    .prog,.bar,.track,.progress>span,.progress>.meta{display:none!important}
    .phase2-position{color:#6f665d;font-size:.86rem;font-weight:750;letter-spacing:.02em;text-align:center}
    .phase2-option{font-size:.88rem!important;font-weight:700!important}
    .phase2-stop{display:inline-flex;align-items:center;color:#6f665d!important;border-color:#bdb5aa!important;text-decoration:none}
    .phase2-reflection{margin:.85rem 0;padding:1rem;border:1px solid #ded8ce;border-radius:14px;background:#fff}
    .phase2-reflection p{margin:.1rem 0 .65rem}
    .phase2-reflection__choices{display:flex;flex-wrap:wrap;gap:.45rem}
    .phase2-reflection__choices button{border:1px solid #ded8ce;border-radius:999px;background:#fff;color:#31412f;padding:.5rem .7rem;cursor:pointer}
    .phase2-reflection__choices button[aria-pressed="true"]{background:#31412f;color:#fff;border-color:#31412f}
  `;
  document.head.appendChild(phase2Style);

  function updatePosition() {
    let host = document.querySelector('.progwrap,.progress');
    if (!host) return;
    let label = host.querySelector('.phase2-position');
    if (!label) {
      label = document.createElement('div');
      label.className = 'phase2-position';
      host.appendChild(label);
    }
    if (title === 'Can You Hear Your Body?') {
      const pct = Number((host.querySelector('.meta span:last-child')?.textContent || '').replace('%',''));
      const section = Number.isFinite(pct) ? Math.round((pct / 100) * 14) + 1 : 1;
      const text = `Section ${section} of 15 · Stop, skip, or leave any question unresolved.`;
      if (label.textContent !== text) label.textContent = text;
      return;
    }
    const screens = [...document.querySelectorAll('.screen')];
    const active = screens.findIndex(s => s.classList.contains('active'));
    const text = active >= 0 ? `Section ${active + 1} of ${screens.length} · Stop, skip, or leave any question unresolved.` : 'Move through only the sections that are useful.';
    if (label.textContent !== text) label.textContent = text;
  }

  function addChoiceControls() {
    document.querySelectorAll('.screen .actions').forEach(actions => {
      if (actions.dataset.phase2Controls) return;
      const forward = actions.querySelector('[data-next],#build');
      if (!forward) return;
      actions.dataset.phase2Controls = 'true';
      if (!forward.disabled) {
        const skip = document.createElement('button');
        skip.type = 'button';
        skip.className = 'btn alt phase2-option';
        skip.textContent = 'Skip / leave unresolved →';
        skip.addEventListener('click', () => forward.click());
        actions.appendChild(skip);
      }
      const stop = document.createElement('a');
      stop.className = 'btn alt phase2-option phase2-stop';
      stop.href = '/tools/';
      stop.textContent = 'Stop here';
      actions.appendChild(stop);
    });
  }

  function replaceValuesCompliance() {
    if (title !== 'Values Clarification') return;
    const box = document.getElementById('compliance');
    if (!box || box.dataset.phase2Reflection) return;
    const questions = [...box.querySelectorAll('label')].map(label => label.textContent.trim()).filter(Boolean);
    if (!questions.length) return;
    box.dataset.phase2Reflection = 'true';
    box.innerHTML = '';
    const key = 'bcn_values_reflections_v1';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) {}
    questions.forEach((question, index) => {
      const item = document.createElement('div');
      item.className = 'phase2-reflection';
      item.innerHTML = `<p><b>${question}</b></p><div class="phase2-reflection__choices"></div>`;
      const choices = item.querySelector('.phase2-reflection__choices');
      ['Worth considering','Not relevant here','Unclear'].forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = option;
        button.setAttribute('aria-pressed', saved[index] === option ? 'true' : 'false');
        button.addEventListener('click', () => {
          const wasSelected = button.getAttribute('aria-pressed') === 'true';
          choices.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed','false'));
          if (wasSelected) delete saved[index];
          else { saved[index] = option; button.setAttribute('aria-pressed','true'); }
          localStorage.setItem(key, JSON.stringify(saved));
        });
        choices.appendChild(button);
      });
      box.appendChild(item);
    });
  }

  function replaceCompletionLanguage() {
    document.querySelectorAll('.eyebrow,.eye').forEach(el => {
      const current = el.textContent.trim();
      if (current === 'Your completed artifact') el.textContent = 'A working influence map';
      if (current === 'Sample completed output') el.textContent = 'Sample working output';
    });
  }

  function applyPhase2Mechanics() {
    updatePosition();
    addChoiceControls();
    replaceValuesCompliance();
    replaceCompletionLanguage();
  }
  applyPhase2Mechanics();
  window.addEventListener('hashchange', applyPhase2Mechanics);
  document.addEventListener('click', () => setTimeout(applyPhase2Mechanics, 0));
  new MutationObserver(applyPhase2Mechanics).observe(document.body, {subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
