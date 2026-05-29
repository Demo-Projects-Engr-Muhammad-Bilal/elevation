// utils/formatDate.js

export const formatDate = (value) => {

          if (!value) return '--';

          try {

                    let date;

                    // Firestore Timestamp Support
                    if (typeof value === 'object' && value.seconds) {

                              date = new Date(value.seconds * 1000);

                    }

                    // ISO String Support
                    else if (typeof value === 'string') {

                              // Convert:
                              // 2026-05-23T21:18:11+05:00
                              // TO:
                              // 2026-05-23T21:18:11

                              const cleaned = value
                                        .replace(/([+-]\d{2}:\d{2})$/, '')
                                        .replace('T', ' ');

                              date = new Date(cleaned);

                    }

                    else {

                              date = new Date(value);

                    }

                    // Invalid Check
                    if (isNaN(date.getTime())) return '--';

                    return date.toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                    });

          } catch (error) {

                    console.error('Date Format Error:', error);

                    return '--';

          }

};