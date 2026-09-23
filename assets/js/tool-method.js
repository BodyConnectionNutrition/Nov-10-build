(function () {
  const title = (document.title || document.querySelector('h1')?.textContent || '').split('|')[0].trim();
  const focusByTitle = {
    'Can You Hear Your Body?': [1, 2],
    'Interrupt the Verdict': [1, 2],
    'Why Am I Eating?': [1, 2, 3, 4, 5],
    'Why am I eating?': [1, 2, 3, 4, 5],
    'Behavior Sequence': [1, 2, 3],
    'Permission & Scarcity': [2, 3, 5],
    'What Is This Doing for Me?': [1, 2, 3, 4],
    'Choice Has Conditions': [3, 4, 5],
    'Conditions & Responsibility Map': [3, 4, 5],
    'Participation Planner': [3, 4, 5],
    'Deconstructing a Belief': [1, 2, 3, 4, 5],
    'Who Taught You to Eat?': [2, 3, 5],
    'How Was My Body Image Created?': [2, 3, 5],
    'Values Clarification': [2, 3, 4, 5],
    'My Food & Body Framework': [1, 2, 3, 4, 5],
    'GLP-1 Evidence Answers': [2, 3, 4, 5]
  };
  const focus = focusByTitle[title];
  if (!focus || document.querySelector('[data-shared-method]')) return;

  const labels = ['Notice', 'Interpret', 'Contextualize', 'Respond', 'Locate responsibility'];
  const hasExistingPath = Boolean(document.querySelector('.practice-path'));
  const section = document.createElement('section');
  section.className = 'shared-method';
  section.dataset.sharedMethod = '';
  section.innerHTML = `
    <p class="shared-method__eyebrow">The shared Body Connection method</p>
    <h2>${hasExistingPath ? 'Agency within the method.' : 'Five moves, not five tests.'}</h2>
    ${hasExistingPath ? '' : `<div class="shared-method__path" aria-label="Notice, Interpret, Contextualize, Respond, Locate responsibility">
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
    .working-record-preface{margin:1rem 0 1.35rem;padding:1rem 1.1rem;border-left:4px solid #c89468;border-radius:0 14px 14px 0;background:#fbf7ef;color:#4f4943}
    .working-record-preface strong{color:#31412f}
    .sparse-preview-example{margin-top:1.1rem;padding:1rem;border:1px dashed #e8c8ad;border-radius:14px;background:#ffffff10}
    .sparse-preview-example p{margin:.35rem 0;color:inherit!important}
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

  const outputNames = {
    'Your Behavior Sequence Map':'A working map of this episode',
    'Your Conditions & Responsibility Map':'A working conditions and responsibility map',
    'Your Belief Deconstruction Map':'A working account of this belief',
    'Your Body Image Influence Map':'A working map of current body-image influences',
    'Your Personal Food & Body Framework':'A working food and body framework',
    'Your Working Participation Plan':'Current possibilities and conditions',
    'Your Scarcity & Permission Map':'A working map of this situation',
    'Your Values Clarification Summary':'A working values account',
    'Your Function Map':'A working map of current effects and functions',
    'Your Food Influence Map':'A working map of current food influences',
    '12 · Your Eating Influences Map':'A working map of this eating moment',
    'Your Body Signal Map':'A working map of current body-signal access'
  };

  function renameOutputs() {
    document.querySelectorAll('.eye,.eyebrow').forEach(el => {
      const replacement = outputNames[el.textContent.trim()];
      if (replacement) el.textContent = replacement;
    });
    document.querySelectorAll('#report h1,#report h2,#summary h1,#summary h2').forEach(el => {
      const replacement = outputNames[el.textContent.trim()];
      if (replacement) el.textContent = replacement;
    });
  }

  function isResultScreen(screen) {
    if (['report','summary','finish'].includes(screen.id)) return true;
    const label = screen.querySelector('.eye,.eyebrow')?.textContent.trim() || '';
    return /^(Your|A working map|Current possibilities|Carry the practice)/i.test(label);
  }

  function makeWorkingPreface() {
    const preface = document.createElement('div');
    preface.className = 'working-record-preface';
    preface.innerHTML = '<strong>This is a working record of what you noticed today.</strong> It is not a score, diagnosis, personality profile, causal measurement, or assignment. Blank, uncertain, contradictory, and changing responses belong in the map. You may keep it, revise it, or leave it behind.';
    return preface;
  }

  function addWorkingPrefaces() {
    document.querySelectorAll('.screen').forEach(screen => {
      if (!isResultScreen(screen) || screen.querySelector('.working-record-preface')) return;
      const heading = screen.querySelector('h1,h2');
      if (heading) heading.insertAdjacentElement('afterend', makeWorkingPreface());
      else screen.prepend(makeWorkingPreface());
    });
    const answer = document.getElementById('answer');
    if (answer?.children.length && !answer.querySelector('.working-record-preface')) {
      const header = answer.querySelector('header');
      if (header) header.insertAdjacentElement('afterend', makeWorkingPreface());
      else answer.prepend(makeWorkingPreface());
    }
  }

  const neutralDefaults = new Map([
    ['Your selected episode','Not recorded / left open.'],
    ['Your selected situation','Not recorded / left open.'],
    ['Your selected food or situation','Not recorded / left open.'],
    ['Your selected pattern','Not recorded / left open.'],
    ['The belief I examined','Not recorded / left open.'],
    ['Your map adds bodily, practical, relational, and structural conditions to the explanation without making agency disappear.','Not explored / no synthesis recorded.'],
    ['Your map adds access and permission as possible parts of the explanation without requiring them to explain everything.','Not explored / no synthesis recorded.'],
    ['Access and permission may deserve consideration alongside other influences.','Not explored / no synthesis recorded.'],
    ['Your map adds function to the explanation without requiring the pattern to be judged as either good or bad.','Not explored / no synthesis recorded.'],
    ['I have permission to revise, wait, or leave this without a plan.','No permission statement recorded.'],
    ['No responses yet. Return to the earlier steps to begin.','No responses recorded. Blank and unresolved fields remain valid.']
  ]);

  function neutralizeBlankDefaults() {
    document.querySelectorAll('#report p,#report span,#summary p,#summary span').forEach(el => {
      if (el.children.length) return;
      const replacement = neutralDefaults.get(el.textContent.trim());
      if (replacement) el.textContent = replacement;
    });
    const statement = document.getElementById('statement');
    if (statement?.textContent.includes('________________')) statement.textContent = 'No authorship statement was generated because the relevant fields were left open.';
  }

  function addSparsePreviewExamples() {
    document.querySelectorAll('.sample-map').forEach(preview => {
      const previewNames = {
        'Eating Drivers Map':'Working map of one eating moment',
        'Body Image Influence Map':'Working map of current influences',
        'Food Influence Map':'Working map of current food influences',
        'Values & Authorship Map':'Working values account',
        'Behavior Sequence Map':'Working map of one episode',
        'Scarcity & Permission Map':'Working map of one situation',
        'Function Map':'Working map of current effects and functions',
        'Belief Deconstruction Map':'Working account of one belief',
        'Conditions & Responsibility Map':'Working map of one situation',
        'Working Participation Plan':'Current possibilities and conditions',
        'Personal Working Framework':'Working food and body framework'
      };
      const title = preview.querySelector('h3');
      if (title && previewNames[title.textContent.trim()]) title.textContent = previewNames[title.textContent.trim()];
      if (preview.querySelector('.sparse-preview-example')) return;
      const example = document.createElement('div');
      example.className = 'sparse-preview-example';
      example.innerHTML = '<strong>Equally valid sparse or uncertain example</strong><p><b>What was noticed:</b> One detail, uncertainty, or nothing recorded</p><p><b>What remains open:</b> Meaning, causality, and response</p><p>Blank, mixed, and unresolved maps are not less complete.</p>';
      preview.appendChild(example);
    });
  }

  function normalizeMethodOrder() {
    const canonical = ['Notice','Interpret','Contextualize','Respond','Locate responsibility'];
    document.querySelectorAll('.practice-path').forEach(path => {
      if (path.dataset.methodOrderNormalized) return;
      const spans = [...path.querySelectorAll('span')];
      if (spans.length !== 5) return;
      const byLabel = new Map(spans.map(span => [span.textContent.replace(/^\s*\d+\s*·\s*/,'').trim(), span]));
      if (!canonical.every(label => byLabel.has(label))) return;
      canonical.forEach((label,index) => {
        const span = byLabel.get(label);
        span.textContent = `${index + 1} · ${label}`;
        path.appendChild(span);
      });
      path.setAttribute('aria-label', canonical.join(', '));
      path.dataset.methodOrderNormalized = 'true';
    });
    document.querySelectorAll('h2').forEach(heading => {
      if (heading.textContent.trim() === 'Contextualize. Locate responsibility. Respond.') heading.textContent = 'Contextualize. Respond. Locate responsibility.';
    });
  }

  function applyPhase2Mechanics() {
    updatePosition();
    addChoiceControls();
    replaceValuesCompliance();
    replaceCompletionLanguage();
    renameOutputs();
    addWorkingPrefaces();
    neutralizeBlankDefaults();
    addSparsePreviewExamples();
    normalizeMethodOrder();
  }
  applyPhase2Mechanics();
  window.addEventListener('hashchange', applyPhase2Mechanics);
  document.addEventListener('click', () => setTimeout(applyPhase2Mechanics, 0));
  new MutationObserver(applyPhase2Mechanics).observe(document.body, {subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
