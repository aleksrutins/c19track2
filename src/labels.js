var number = (n, increase, label) => `${label? `<b>${label}:</b> ` : ``}${n} (${increase > 0? `<span foreground="red">+` : `<span foreground="green">`}${increase}</span>)`;
