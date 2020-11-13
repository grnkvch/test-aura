export function addConnection(connection_id: string): [string, string[]]{
  return [
    'INSERT INTO connections (connection_id) VALUES ($1);',
    [connection_id]
  ]
}
export function deleteConnection(connection_id: string): [string, string[]]{
  return [
    'DELETE FROM connections WHERE connection_id = $1',
    [connection_id]
  ]
}
export function getConnection(): [string]{

  return ['SELECT connection_id FROM connections;']
}