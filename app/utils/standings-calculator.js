export default function getStandings(games, users, uid, arenaId, rankType) {
  var userRanks = [];
  users.forEach(function(user){
    let areansjoined = user.get('arenasjoined') || [];
    // filter by current arena
    if (areansjoined.indexOf(arenaId) != -1){
      let userid = user.get('uid');
      let name = user.get('name');
      let wins = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') === 6) || (item.get('player1id') == userid && item.get('player1score') === 6)).get('length');
      let losses = games.filter((item, index, self) => (item.get('player2id') === userid && item.get('player2score') != 6) || (item.get('player1id') == userid && item.get('player1score') != 6)).get('length');
      let ratio = wins/(wins+losses) || 0;
      let player2scores = games.filter((item, index, self) => (item.get('player2id') === userid)).map(item => item.get('player2score')).reduce(function(a, b) { return a + b; }, 0);
      let player1scores = games.filter((item, index, self) => (item.get('player1id') === userid)).map(item => item.get('player1score')).reduce(function(a, b) { return a + b; }, 0);
      let goalsFor = player2scores + player1scores;
      let gaPlayer2scores = games.filter((item, index, self) => (item.get('player2id') === userid)).map(item => item.get('player1score')).reduce(function(a, b) { return a + b; }, 0);
      let gaPlayer1scores = games.filter((item, index, self) => (item.get('player1id') === userid)).map(item => item.get('player2score')).reduce(function(a, b) { return a + b; }, 0);
      let goalsAgainst = gaPlayer2scores + gaPlayer1scores;
      let isSignedInUser = user.get('uid') === uid;
      userRanks.push({
        user: user,
        ratio: ratio,
        wins: wins,
        losses: losses,
        goalsFor: goalsFor,
        goalsAgainst: goalsAgainst,
        goalDif: goalsFor - goalsAgainst,
        games: wins+losses,
        isSignedInUser: isSignedInUser
      });
    }
  });
  // calculate points based on opponent win %
  userRanks.forEach(function(userRanked){
    userRanked.points = 0;
    games.forEach(function(game){
      if (userRanked.user.get('uid') === game.get('player1id') || userRanked.user.get('uid') === game.get('player2id')){
        if (userRanked.user.get('uid') === game.get('player1id')){
          if (game.get('player1score') > game.get('player2score')){
            userRanked.points += (0.5 + (1.5*userRanks.filter((item, index, self) => (item.user.get('uid') === game.get('player2id')))[0].ratio));
          }
        }
        else if (userRanked.user.get('uid') === game.get('player2id'))
        {
          if (game.get('player2score') > game.get('player1score')){
            userRanked.points += (0.5 + (1.5*userRanks.filter((item, index, self) => (item.user.get('uid') === game.get('player1id')))[0].ratio));
          }
        }
      }
    });
  });
  var usersRanked = userRanks.sort(sortByPercentage);
  if (rankType === 'Win %'){
    usersRanked = userRanks.sort(sortByPercentage);
  }
  else if (rankType === 'Wins'){
    usersRanked = userRanks.sort(sortByWins);
  }
  else if (rankType === 'Goal Dif'){
    usersRanked = userRanks.sort(sortByGoalDif);
  }
  else if (rankType === 'Points'){
    usersRanked = userRanks.sort(sortByPoints);
  }
  else if (rankType === 'Games'){
    usersRanked = userRanks.sort(sortByGames);
  }
  // add rank to object
  for (var i = 0; i < usersRanked.length; i++) {
      usersRanked[i].rank = i+1;
      usersRanked[i].ratio = (usersRanked[i].ratio *100).toFixed(0);
      usersRanked[i].points = (usersRanked[i].points).toFixed(1);
  }
  return usersRanked;
}

export function sortByPercentage(a, b){
  if (a.ratio > b.ratio) {
    return -1;
  }
  if (a.ratio < b.ratio) {
    return 1;
  }
  if (a.wins > b.wins){
    return -1;
  }
  if (b.wins > a.wins){
    return 1;
  }
  return 0;
}

export function sortByWins(a, b){
  if (a.wins > b.wins){
    return -1;
  }
  if (b.wins > a.wins){
    return 1;
  }
  if (a.ratio > b.ratio) {
    return -1;
  }
  if (a.ratio < b.ratio) {
    return 1;
  }
  return 0;
}

export function sortByGoalDif(a, b){
  if (a.goalDif > b.goalDif){
    return -1;
  }
  if (b.goalDif > a.goalDif){
    return 1;
  }
  if (a.ratio > b.ratio) {
    return -1;
  }
  if (a.ratio < b.ratio) {
    return 1;
  }
  return 0;
}

export function sortByPoints(a, b){
  if (a.points > b.points){
    return -1;
  }
  if (b.points > a.points){
    return 1;
  }
  if (a.ratio > b.ratio) {
    return -1;
  }
  if (a.ratio < b.ratio) {
    return 1;
  }
  return 0;
}

export function sortByGames(a, b){
  if (a.games > b.games){
    return -1;
  }
  if (b.games > a.games){
    return 1;
  }
  if (a.ratio > b.ratio) {
    return -1;
  }
  if (a.ratio < b.ratio) {
    return 1;
  }
  return 0;
}
