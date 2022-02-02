import { state } from '#/game/store'
import type { ChampionUnit } from '#/game/unit'

import { BOARD_COL_COUNT } from '#/helpers/constants'
import type { HexCoord } from '#/helpers/types'
import { getArrayValueCounts, randomItem } from '#/helpers/utils'

export function getAbilityValue(name: string, champion: ChampionUnit) {
	const entry = champion.data.ability.variables.find(valueObject => valueObject.name === name)
	if (!entry) {
		return undefined
	}
	return entry.value?.[champion.starLevel]
}

function getUnitsOfTeam(team: number | null) {
	return team == null ? state.units : state.units.filter(unit => unit.team === team)
}

export function getRowOfMost(team: number | null) {
	const units = getUnitsOfTeam(team)
	const unitRows = units.map(unit => unit.currentPosition()[1])
	const unitsPerRow = getArrayValueCounts(unitRows)
	const maxUnitsInRowCount = unitsPerRow.reduce((previous, current) => Math.max(previous, current[1]), 0)
	const randomRowTarget = randomItem(unitsPerRow.filter(row => row[1] === maxUnitsInRowCount))
	const row = randomRowTarget ? parseInt(randomRowTarget[0], 10) : 0
	return [...Array(BOARD_COL_COUNT).keys()].map((col): HexCoord => [col, row])
}
