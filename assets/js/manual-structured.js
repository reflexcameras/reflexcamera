(() => {
  const initialiseStructuredManual = () => {
    const article = document.querySelector('.source-guide--structured');
    if (!article || article.dataset.structured === 'true') return;
    article.dataset.structured = 'true';

    const contactStrip = article.querySelector(':scope > .guide-contact-strip');
    const quickHeading = article.querySelector(':scope > #reflex---quick-guide');
    const fullHeading = article.querySelector(':scope > #reflex---full-guide');

    if (quickHeading && fullHeading) {
      const quickSection = document.createElement('section');
      quickSection.className = 'structured-quick-guide';
      article.insertBefore(quickSection, quickHeading);
      quickSection.appendChild(quickHeading);

      let node = quickSection.nextSibling;
      while (node && node !== fullHeading) {
        const next = node.nextSibling;
        quickSection.appendChild(node);
        node = next;
      }

      const quickNodes = [...quickSection.children].slice(1);
      quickNodes
        .filter((quickNode) => quickNode.matches('div[style*="page-break-after"]'))
        .forEach((quickNode) => quickNode.remove());

      quickSection
        .querySelectorAll(':scope > .structured-numbered-list > li')
        .forEach((item) => {
          const content = document.createElement('div');
          content.className = 'structured-numbered-list__content';
          while (item.firstChild) content.appendChild(item.firstChild);
          item.appendChild(content);
        });
    }

    if (fullHeading) fullHeading.classList.add('structured-part-heading');

    const faqHeading = article.querySelector(':scope > #product-faqs');
    if (faqHeading) {
      const faqSection = document.createElement('section');
      faqSection.className = 'structured-faqs';
      article.insertBefore(faqSection, faqHeading);
      faqSection.appendChild(faqHeading);

      let node = faqSection.nextElementSibling;
      while (node && node !== contactStrip) {
        if (node.tagName !== 'H2') {
          const next = node.nextElementSibling;
          faqSection.appendChild(node);
          node = next;
          continue;
        }

        const heading = node;
        const details = document.createElement('details');
        details.className = 'structured-faq';
        details.id = heading.id;
        const summary = document.createElement('summary');
        summary.textContent = heading.textContent;
        details.appendChild(summary);
        faqSection.appendChild(details);

        node = heading.nextElementSibling;
        heading.remove();
        while (node && node !== contactStrip && node.tagName !== 'H2' && node.tagName !== 'H1') {
          const next = node.nextElementSibling;
          details.appendChild(node);
          node = next;
        }
      }

      const openLinkedFaq = () => {
        const targetId = decodeURIComponent(window.location.hash.slice(1));
        const linkedFaq = targetId ? document.getElementById(targetId) : null;
        if (!linkedFaq?.matches('.structured-faq')) return;

        linkedFaq.open = true;
        window.requestAnimationFrame(() => linkedFaq.scrollIntoView({ block: 'start' }));
      };

      openLinkedFaq();
      window.addEventListener('load', openLinkedFaq, { once: true });
      window.addEventListener('hashchange', openLinkedFaq);
    }

    [...article.querySelectorAll(':scope > h2')].forEach((heading) => {
      const chapter = document.createElement('section');
      chapter.className = 'structured-chapter';
      article.insertBefore(chapter, heading);
      chapter.appendChild(heading);

      let node = chapter.nextElementSibling;
      while (
        node &&
        node !== contactStrip &&
        node.tagName !== 'H1' &&
        node.tagName !== 'H2' &&
        !node.classList.contains('structured-faqs')
      ) {
        const next = node.nextElementSibling;
        chapter.appendChild(node);
        node = next;
      }
    });

    article.querySelectorAll('.structured-chapter').forEach((chapter) => {
      [...chapter.querySelectorAll(':scope > h3')].forEach((heading) => {
        const subsection = document.createElement('section');
        subsection.className = 'structured-subsection';
        chapter.insertBefore(subsection, heading);
        subsection.appendChild(heading);

        let node = subsection.nextElementSibling;
        while (node && node.tagName !== 'H3') {
          const next = node.nextElementSibling;
          subsection.appendChild(node);
          node = next;
        }
      });
    });

    const formatSettingRows = (sectionId) => {
      const section = article.querySelector(`#${sectionId}`)?.parentElement;
      if (!section) return;

      [...section.querySelectorAll(':scope > p')].forEach((paragraph) => {
        const nodes = [...paragraph.childNodes];
        let labelStart = 0;

        while (
          labelStart < nodes.length &&
          ((nodes[labelStart].nodeType === Node.TEXT_NODE &&
            nodes[labelStart].textContent.trim() === '') ||
            nodes[labelStart].nodeName === 'BR')
        ) {
          labelStart += 1;
        }

        if (nodes[labelStart]?.nodeName !== 'CODE') return;

        const separatorIndex = nodes.findIndex(
          (node, index) => index > labelStart && node.nodeName === 'BR'
        );
        if (separatorIndex === -1) return;

        const label = document.createElement('span');
        label.className = 'structured-setting-label';
        nodes
          .slice(labelStart, separatorIndex)
          .forEach((node) => label.appendChild(node));
        nodes.slice(0, labelStart).forEach((node) => node.remove());
        nodes[separatorIndex].replaceWith(label);
        paragraph.classList.add('structured-setting-row');
      });

      [...section.querySelectorAll(':scope > .structured-setting-row')].forEach(
        (settingRow) => {
          const group = document.createElement('section');
          group.className = 'structured-setting-group';
          section.insertBefore(group, settingRow);

          let node = settingRow;
          while (node) {
            const next = node.nextElementSibling;
            group.appendChild(node);
            if (next?.classList.contains('structured-setting-row')) break;
            node = next;
          }
        }
      );
    };

    ['home', 'schedule', 'log', 'media', 'wifi'].forEach(formatSettingRows);

    const groupImageRuns = (container) => {
      const children = [...container.children];
      let run = [];

      const flush = () => {
        if (run.length > 1) {
          const grid = document.createElement('div');
          grid.className = 'structured-photo-grid';
          container.insertBefore(grid, run[0]);
          run.forEach((paragraph) => grid.appendChild(paragraph));
        }
        run = [];
      };

      children.forEach((child) => {
        const isImageParagraph =
          child.tagName === 'P' &&
          child.children.length === 1 &&
          child.firstElementChild?.tagName === 'IMG' &&
          child.textContent.trim() === '';
        if (isImageParagraph) run.push(child);
        else flush();
      });
      flush();
    };

    article
      .querySelectorAll('.structured-quick-guide, .structured-chapter, .structured-subsection')
      .forEach(groupImageRuns);

    const fieldProcedureHeading = article.querySelector('#positioning-light-stand-on-tree');
    fieldProcedureHeading?.parentElement
      .querySelector(':scope > ol')
      ?.classList.add('structured-numbered-list');

    const connectionHeading = article.querySelector('#connecting-to-the-settings-page');
    connectionHeading?.parentElement
      .querySelector(':scope > ul')
      ?.classList.add('structured-credentials');

    const settingsPageHeading = article.querySelector('#reflex-settings-webpage');
    const settingsPageIndex = settingsPageHeading?.parentElement.querySelector(':scope > ol');
    if (settingsPageIndex) {
      settingsPageIndex.classList.add('structured-page-index');

      const settingsPages = ['home', 'schedule', 'log', 'media', 'wifi'];
      [...settingsPageIndex.children].forEach((item, index) => {
        const target = settingsPages[index];
        if (!target) return;

        const link = document.createElement('a');
        link.href = `#${target}`;
        link.setAttribute('aria-label', `Jump to the ${item.textContent.trim()} page section`);
        while (item.firstChild) link.appendChild(item.firstChild);
        item.appendChild(link);
      });
    }

    article.querySelectorAll('table').forEach((table) => table.classList.add('structured-table'));

    const batteryCalculator = article.querySelector('[data-battery-runtime-calculator]');
    if (batteryCalculator) {
      const capacityInput = batteryCalculator.querySelector('#battery-capacity');
      const result = batteryCalculator.querySelector('.battery-runtime-calculator__result');
      const resultValue = batteryCalculator.querySelector('[data-battery-runtime-value]');
      const resultUnit = batteryCalculator.querySelector('[data-battery-runtime-unit]');

      capacityInput?.addEventListener('input', () => {
        capacityInput.setCustomValidity('');
        if (result) result.hidden = true;
      });

      batteryCalculator.addEventListener('submit', (event) => {
        event.preventDefault();

        const capacity = Number.parseFloat(capacityInput?.value ?? '');
        if (!Number.isFinite(capacity) || capacity <= 0) {
          capacityInput?.setCustomValidity('Enter a battery capacity greater than 0 Ah.');
          capacityInput?.reportValidity();
          return;
        }

        const estimatedNights = (capacity * 12) / 2.55 / 9;
        if (resultValue) resultValue.textContent = estimatedNights.toFixed(2);
        if (resultUnit) resultUnit.textContent = estimatedNights.toFixed(2) === '1.00' ? 'night' : 'nights';
        if (result) result.hidden = false;
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseStructuredManual);
  } else {
    initialiseStructuredManual();
  }
})();
