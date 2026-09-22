(function () {
  const title = (document.title || document.querySelector('h1')?.textContent || '').split('|')[0].trim();
  const focusByTitle = {
    'Can You Hear Your Body?': [1, 2],
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
})();
