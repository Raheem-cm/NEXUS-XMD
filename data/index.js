/**
 * RAHEEM-CMD WhatsApp Bot – Data Utilities
 * Author: +255763111390
 * GitHub: https://github.com/Raheem-cm/RAHEEM-CMD
 * Description:
 * This module centralizes data storage, anti-delete settings, and group/user message tracking.
 */

const {
    AntiDelDB,
    initializeAntiDeleteSettings,
    setAnti,
    getAnti,
    getAllAntiDeleteSettings,
} = require('./antidel');

const {
    saveContact,
    loadMessage,
    getName,
    getChatSummary,
    saveGroupMetadata,
    getGroupMetadata,
    saveMessageCount,
    getInactiveGroupMembers,
    getGroupMembersMessageCount,
    saveMessage,
} = require('./store');

module.exports = {
    // Anti-delete features
    AntiDelDB,
    initializeAntiDeleteSettings,
    setAnti,
    getAnti,
    getAllAntiDeleteSettings,

    // Chat storage & tracking
    saveContact,
    loadMessage,
    getName,
    getChatSummary,
    saveGroupMetadata,
    getGroupMetadata,
    saveMessageCount,
    getInactiveGroupMembers,
    getGroupMembersMessageCount,
    saveMessage,
};
