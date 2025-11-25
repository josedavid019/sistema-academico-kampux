export function _createToastEl(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `fixed right-4 bottom-6 z-50 max-w-sm w-full p-3 rounded shadow-lg transform transition-all duration-200`;
  el.style.pointerEvents = 'auto';
  if (type === 'success') el.innerHTML = `<div class="p-2 bg-green-600 text-white rounded">${message}</div>`;
  else if (type === 'error') el.innerHTML = `<div class="p-2 bg-red-600 text-white rounded">${message}</div>`;
  else el.innerHTML = `<div class="p-2 bg-gray-800 text-white rounded">${message}</div>`;
  return el;
}

export function toast(message, opts = {}) {
  const { type = 'info', duration = 4000 } = opts;
  if (typeof window === 'undefined') return;
  const containerId = 'kampux-toasts-root';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.position = 'fixed';
    container.style.right = '1rem';
    container.style.bottom = '1.5rem';
    container.style.zIndex = 9999;
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '0.5rem';
    document.body.appendChild(container);
  }

  const toastEl = _createToastEl(message, type);
  toastEl.style.opacity = '0';
  toastEl.style.transform = 'translateY(8px)';
  container.appendChild(toastEl);
  // animate in
  requestAnimationFrame(() => {
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateY(0)';
  });

  const remove = () => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateY(8px)';
    setTimeout(() => {
      try { container.removeChild(toastEl); } catch (e) {}
      if (container.childElementCount === 0) {
        try { document.body.removeChild(container); } catch (e) {}
      }
    }, 200);
  };

  const timeout = setTimeout(remove, duration);
  toastEl.addEventListener('click', () => {
    clearTimeout(timeout);
    remove();
  });

  return { remove };
}

export const toastSuccess = (msg, opts) => toast(msg, { ...opts, type: 'success' });
export const toastError = (msg, opts) => toast(msg, { ...opts, type: 'error' });
export const toastInfo = (msg, opts) => toast(msg, { ...opts, type: 'info' });
